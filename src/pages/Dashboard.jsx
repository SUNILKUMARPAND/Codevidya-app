import { useState } from 'react'
import { Link } from 'react-router-dom'
import CourseCard from '../components/CourseCard.jsx'
import CourseLogo from '../components/CourseLogo.jsx'
import Icon from '../components/Icon.jsx'
import { EmptyState, ProgressBar, SectionHeader } from '../components/ui.jsx'
import { useLearning } from '../context/learningContext.js'
import { getCourse, getLesson } from '../data/courses/index.js'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import { dayKey, plural } from '../utils/format.js'

const WEEKS = 16

// Last WEEKS weeks of activity as columns of 7 days (Sunday first), like a contribution graph
function buildCalendar(activity) {
  const active = new Set(activity)
  const today = new Date()
  const start = new Date(today)
  start.setDate(today.getDate() - today.getDay() - (WEEKS - 1) * 7)
  const weeks = []
  for (let w = 0; w < WEEKS; w++) {
    const days = []
    for (let d = 0; d < 7; d++) {
      const date = new Date(start)
      date.setDate(start.getDate() + w * 7 + d)
      const key = dayKey(date)
      days.push({ key, active: active.has(key), future: date > today })
    }
    weeks.push(days)
  }
  return weeks
}

export default function Dashboard() {
  useDocumentTitle('My learning')
  const { stats, enrolled, progressById, lastLesson, bookmarks, notes, activity, learnerName, setLearnerName, resetProgress, unenroll } = useLearning()
  const [confirmReset, setConfirmReset] = useState(false)

  const myCourses = Object.entries(enrolled)
    .sort((a, b) => b[1].localeCompare(a[1]))
    .map(([id]) => getCourse(id))
    .filter(Boolean)
  const inProgress = myCourses.filter((c) => !progressById[c.id].certified)
  const certified = myCourses.filter((c) => progressById[c.id].certified)
  const wishlist = bookmarks.map(getCourse).filter(Boolean)
  const noteEntries = Object.entries(notes)
    .map(([key, text]) => {
      const [courseId, lessonId] = key.split('/')
      const course = getCourse(courseId)
      return course && { key, text, course, lesson: getLesson(course, lessonId) }
    })
    .filter((n) => n?.lesson)

  const tiles = [
    ['zap', 'XP earned', stats.xp],
    ['flame', 'Day streak', stats.streak],
    ['check', 'Classes done', stats.lessonsDone],
    ['award', 'Certificates', stats.certificates],
  ]

  return (
    <div className="container page">
      <header className="page-header page-header--row">
        <div>
          <h1>{learnerName ? `Welcome back, ${learnerName.split(' ')[0]}!` : 'My learning'}</h1>
          <p className="muted">Your progress is saved automatically in this browser.</p>
        </div>
        <label className="name-field">
          Your name (for certificates)
          <input value={learnerName} onChange={(e) => setLearnerName(e.target.value)} placeholder="Full name" maxLength={60} />
        </label>
      </header>

      <div className="stat-tiles">
        {tiles.map(([icon, label, value]) => (
          <div key={label} className="stat-tile">
            <Icon name={icon} size={20} />
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <section className="panel activity">
        <div className="activity__head">
          <h2 className="panel__title-sm">Learning activity</h2>
          <span className="muted">{plural(activity.length, 'active day')} in total</span>
        </div>
        <div className="calendar" role="img" aria-label={`Activity over the last ${WEEKS} weeks: ${activity.length} active days`}>
          {buildCalendar(activity).map((week, w) => (
            <div key={w} className="calendar__week">
              {week.map((day) => (
                <span key={day.key} className={`calendar__day ${day.active ? 'is-active' : ''} ${day.future ? 'is-future' : ''}`} title={day.key} />
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeader title="In progress" subtitle={plural(inProgress.length, 'course')} />
        {inProgress.length ? (
          <div className="my-courses">
            {inProgress.map((course) => {
              const p = progressById[course.id]
              return (
                <div key={course.id} className="my-course">
                  <CourseLogo course={course} size={48} />
                  <div className="my-course__body">
                    <Link to={`/courses/${course.id}`} className="my-course__title">
                      {course.title}
                    </Link>
                    <span className="muted">
                      {p.done}/{p.total} classes · quiz {p.quizPassed ? 'passed' : p.quizBest !== null ? `best ${Math.round(p.quizBest * 100)}%` : 'not taken'}
                    </span>
                    <ProgressBar percent={p.percent} color={course.color} label={`${course.title} progress`} />
                  </div>
                  <div className="my-course__actions">
                    <Link to={p.lessonsDone ? `/quiz/${course.id}` : `/learn/${course.id}/${lastLesson[course.id] ?? '1'}`} className="button button--primary button--small">
                      {p.lessonsDone ? 'Take quiz' : 'Resume'}
                    </Link>
                    <button type="button" className="button button--ghost button--small" onClick={() => unenroll(course.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <EmptyState title="You haven’t started a course yet" action={<Link to="/courses" className="button button--primary">Browse courses</Link>}>
            Pick any skill and start your first class. It takes less than 10 minutes.
          </EmptyState>
        )}
      </section>

      {certified.length > 0 && (
        <section className="section">
          <SectionHeader title="Certificates" subtitle={plural(certified.length, 'course') + ' completed'} />
          <div className="cert-list">
            {certified.map((course) => (
              <Link key={course.id} to={`/certificate/${course.id}`} className="cert-chip">
                <CourseLogo course={course} size={36} />
                <span>
                  <strong>{course.title}</strong>
                  <span className="muted">View certificate</span>
                </span>
                <Icon name="award" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {noteEntries.length > 0 && (
        <section className="section">
          <SectionHeader title="My notes" subtitle={plural(noteEntries.length, 'note')} />
          <div className="notes-grid">
            {noteEntries.map(({ key, text, course, lesson }) => (
              <Link key={key} to={`/learn/${course.id}/${lesson.id}`} className="note-card">
                <span className="note-card__where">
                  {course.title} · {lesson.title}
                </span>
                <p>{text}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <SectionHeader title="Wishlist" subtitle="Courses you saved for later" />
        {wishlist.length ? (
          <div className="course-grid">
            {wishlist.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <p className="muted">Tap the bookmark icon on any course to save it here.</p>
        )}
      </section>

      <section className="danger-zone">
        <div>
          <h2>Reset progress</h2>
          <p className="muted">Clears enrolments, completed classes, quiz scores, notes and streak from this browser.</p>
        </div>
        {confirmReset ? (
          <div className="stack-row">
            <button
              type="button"
              className="button button--danger"
              onClick={() => {
                resetProgress()
                setConfirmReset(false)
              }}
            >
              Yes, reset everything
            </button>
            <button type="button" className="button button--ghost" onClick={() => setConfirmReset(false)}>
              Cancel
            </button>
          </div>
        ) : (
          <button type="button" className="button button--ghost" onClick={() => setConfirmReset(true)}>
            <Icon name="reset" size={16} /> Reset progress
          </button>
        )}
      </section>
    </div>
  )
}
