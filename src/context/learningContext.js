import { createContext, useContext } from 'react'

// Shared learner state: enrolments, completed lessons, quiz scores, notes, theme...
// The provider lives in LearningProvider.jsx; components read it with useLearning().
export const LearningContext = createContext(null)

export function useLearning() {
  const learning = useContext(LearningContext)
  if (!learning) throw new Error('useLearning must be used inside <LearningProvider>')
  return learning
}

export const PASS_MARK = 0.75
export const lessonKey = (courseId, lessonId) => `${courseId}/${lessonId}`
