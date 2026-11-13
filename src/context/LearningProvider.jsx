import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { courses } from '../data/courses/index.js'
import useLocalStorage from '../hooks/useLocalStorage.js'
import { dayKey, streakFrom } from '../utils/format.js'
import { LearningContext, PASS_MARK, lessonKey } from './learningContext.js'

const XP_PER_LESSON = 10
const XP_PER_QUIZ = 50

export default function LearningProvider({ children }) {
  // Everything below is saved to localStorage, so progress survives a refresh
  const [enrolled, setEnrolled] = useLocalStorage('codevidya:enrolled', {}) // courseId -> ISO date
  const [completed, setCompleted] = useLocalStorage('codevidya:completed', {}) // "course/lesson" -> ISO date
  const [quizzes, setQuizzes] = useLocalStorage('codevidya:quizzes', {}) // courseId -> { best, attempts, passedAt }
  const [notes, setNotes] = useLocalStorage('codevidya:notes', {}) // "course/lesson" -> text
  const [bookmarks, setBookmarks] = useLocalStorage('codevidya:bookmarks', [])
  const [lastLesson, setLastLesson] = useLocalStorage('codevidya:lastLesson', {}) // courseId -> lessonId
  const [activity, setActivity] = useLocalStorage('codevidya:activity', []) // YYYY-MM-DD days
  const [learnerName, setLearnerName] = useLocalStorage('codevidya:name', '')
  const [theme, setTheme] = useLocalStorage(
    'codevidya:theme',
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  )

  const [toast, setToast] = useState('')
  const toastTimer = useRef(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => () => clearTimeout(toastTimer.current), [])

  const showToast = useCallback((message) => {
    clearTimeout(toastTimer.current)
    setToast(message)
    toastTimer.current = setTimeout(() => setToast(''), 2600)
  }, [])

  const recordActivity = useCallback(() => {
    const today = dayKey()
    setActivity((days) => (days.includes(today) ? days : [...days, today].slice(-400)))
  }, [setActivity])

  const enroll = useCallback(
    (courseId) => {
      setEnrolled((map) => (map[courseId] ? map : { ...map, [courseId]: new Date().toISOString() }))
    },
    [setEnrolled],
  )

  const unenroll = useCallback(
    (courseId) => {
      setEnrolled((map) => {
        const next = { ...map }
        delete next[courseId]
        return next
      })
    },
    [setEnrolled],
  )

  const visitLesson = useCallback(
    (courseId, lessonId) => {
      enroll(courseId)
      setLastLesson((map) => (map[courseId] === lessonId ? map : { ...map, [courseId]: lessonId }))
    },
    [enroll, setLastLesson],
  )

  const toggleComplete = useCallback(
    (courseId, lessonId) => {
      const key = lessonKey(courseId, lessonId)
      const wasDone = Boolean(completed[key])
      setCompleted((map) => {
        const next = { ...map }
        if (next[key]) delete next[key]
        else next[key] = new Date().toISOString()
        return next
      })
      if (!wasDone) {
        recordActivity()
        showToast(`Lesson complete · +${XP_PER_LESSON} XP`)
      }
    },
    [completed, setCompleted, recordActivity, showToast],
  )

  const saveQuiz = useCallback(
    (courseId, score) => {
      const passed = score >= PASS_MARK
      setQuizzes((map) => {
        const prev = map[courseId] ?? { best: 0, attempts: 0, passedAt: null }
        return {
          ...map,
          [courseId]: {
            best: Math.max(prev.best, score),
            attempts: prev.attempts + 1,
            passedAt: prev.passedAt ?? (passed ? new Date().toISOString() : null),
          },
        }
      })
      enroll(courseId)
      recordActivity()
    },
    [setQuizzes, enroll, recordActivity],
  )

  const saveNote = useCallback(
    (courseId, lessonId, text) => {
      const key = lessonKey(courseId, lessonId)
      setNotes((map) => {
        const next = { ...map }
        if (text.trim()) next[key] = text
        else delete next[key]
        return next
      })
    },
    [setNotes],
  )

  const toggleBookmark = useCallback(
    (courseId) => {
      const adding = !bookmarks.includes(courseId)
      setBookmarks((list) => (list.includes(courseId) ? list.filter((id) => id !== courseId) : [courseId, ...list]))
      showToast(adding ? 'Saved to your wishlist' : 'Removed from your wishlist')
    },
    [bookmarks, setBookmarks, showToast],
  )

  const resetProgress = useCallback(() => {
    setEnrolled({})
    setCompleted({})
    setQuizzes({})
    setNotes({})
    setLastLesson({})
    setActivity([])
    showToast('All progress has been reset')
  }, [setEnrolled, setCompleted, setQuizzes, setNotes, setLastLesson, setActivity, showToast])

  // Per-course progress, recomputed only when completions or quizzes change
  const progressById = useMemo(() => {
    const map = {}
    for (const course of courses) {
      const done = course.lessons.filter((l) => completed[lessonKey(course.id, l.id)]).length
      const quiz = quizzes[course.id]
      const lessonsDone = done === course.lessons.length
      map[course.id] = {
        done,
        total: course.lessons.length,
        percent: Math.round((done / course.lessons.length) * 100),
        quizPassed: Boolean(quiz?.passedAt),
        quizBest: quiz?.best ?? null,
        lessonsDone,
        certified: lessonsDone && Boolean(quiz?.passedAt),
      }
    }
    return map
  }, [completed, quizzes])

  const stats = useMemo(() => {
    const lessonsDone = Object.keys(completed).length
    const quizzesPassed = Object.values(quizzes).filter((q) => q.passedAt).length
    return {
      lessonsDone,
      quizzesPassed,
      xp: lessonsDone * XP_PER_LESSON + quizzesPassed * XP_PER_QUIZ,
      streak: streakFrom(activity),
      certificates: Object.values(progressById).filter((p) => p.certified).length,
      enrolledCount: Object.keys(enrolled).length,
    }
  }, [completed, quizzes, activity, progressById, enrolled])

  const value = useMemo(
    () => ({
      enrolled,
      completed,
      quizzes,
      notes,
      bookmarks,
      lastLesson,
      activity,
      learnerName,
      theme,
      toast,
      progressById,
      stats,
      enroll,
      unenroll,
      visitLesson,
      toggleComplete,
      saveQuiz,
      saveNote,
      toggleBookmark,
      resetProgress,
      setLearnerName,
      showToast,
      isComplete: (courseId, lessonId) => Boolean(completed[lessonKey(courseId, lessonId)]),
      toggleTheme: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    }),
    [
      enrolled, completed, quizzes, notes, bookmarks, lastLesson, activity, learnerName, theme, toast,
      progressById, stats, enroll, unenroll, visitLesson, toggleComplete, saveQuiz, saveNote,
      toggleBookmark, resetProgress, setLearnerName, showToast, setTheme,
    ],
  )

  return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>
}
