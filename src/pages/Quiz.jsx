import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CourseLogo from '../components/CourseLogo.jsx'
import Icon from '../components/Icon.jsx'
import { Breadcrumbs } from '../components/ui.jsx'
import { PASS_MARK, useLearning } from '../context/learningContext.js'
import { getCourse } from '../data/courses/index.js'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import NotFound from './NotFound.jsx'

export default function Quiz() {
  const { courseId } = useParams()
  const course = getCourse(courseId)
  useDocumentTitle(course ? `${course.title} quiz` : 'Quiz')
  const { saveQuiz, progressById } = useLearning()
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  // Reset when navigating from one course's quiz to another
  const [lastCourse, setLastCourse] = useState(courseId)
  if (courseId !== lastCourse) {
    setLastCourse(courseId)
    setAnswers({})
    setSubmitted(false)
  }

  if (!course) return <NotFound />

  const total = course.quiz.length
  const answered = Object.keys(answers).length
  const correct = course.quiz.filter((q) => answers[q.id] === q.answer).length
  const score = correct / total
  const passed = score >= PASS_MARK
  const progress = progressById[course.id]

  function submit(event) {
    event.preventDefault()
    if (answered < total) return
    setSubmitted(true)
    saveQuiz(course.id, score)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function retry() {
    setAnswers({})
    setSubmitted(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="container page page--narrow">
      <Breadcrumbs items={[{ label: 'Courses', to: '/courses' }, { label: course.title, to: `/courses/${course.id}` }, { label: 'Quiz' }]} />
      <header className="quiz-header">
        <CourseLogo course={course} size={56} />
        <div>
          <h1>{course.title} quiz</h1>
          <p className="muted">
            {total} questions · pass mark {PASS_MARK * 100}%{progress.quizBest !== null && ` · your best: ${Math.round(progress.quizBest * 100)}%`}
          </p>
        </div>
      </header>

      {submitted && (
        <section className={`quiz-result ${passed ? 'is-pass' : 'is-fail'}`} role="status">
          <div className="quiz-result__score">{Math.round(score * 100)}%</div>
          <div>
            <h2>{passed ? 'You passed! 🎉' : 'Not quite yet'}</h2>
            <p>
              You answered {correct} of {total} correctly.{' '}
              {passed
                ? progress.lessonsDone
                  ? 'You have earned your certificate.'
                  : 'Complete the remaining classes to unlock your certificate.'
                : `You need ${Math.ceil(PASS_MARK * total)} correct answers. Review the explanations below and try again.`}
            </p>
            <div className="quiz-result__actions">
              {passed && progress.lessonsDone && (
                <Link to={`/certificate/${course.id}`} className="button button--primary">
                  <Icon name="award" size={16} /> View certificate
                </Link>
              )}
              {passed && !progress.lessonsDone && (
                <Link to={`/courses/${course.id}`} className="button button--primary">
                  Back to classes
                </Link>
              )}
              <button type="button" className="button button--ghost" onClick={retry}>
                <Icon name="reset" size={16} /> Retake quiz
              </button>
              <Link to={`/docs/${course.id}`} className="button button--ghost">
                <Icon name="file" size={16} /> Review the docs
              </Link>
            </div>
          </div>
        </section>
      )}

      <form onSubmit={submit} className="quiz">
        {course.quiz.map((q, i) => {
          const chosen = answers[q.id]
          return (
            <fieldset key={q.id} className="question" disabled={submitted}>
              <legend>
                <span className="question__num">Question {i + 1}</span>
                {q.question}
              </legend>
              <div className="options">
                {q.options.map((option, o) => {
                  const state = submitted ? (o === q.answer ? 'is-correct' : o === chosen ? 'is-wrong' : '') : chosen === o ? 'is-chosen' : ''
                  return (
                    <label key={option} className={`option ${state}`}>
                      <input type="radio" name={`q-${q.id}`} checked={chosen === o} onChange={() => setAnswers((a) => ({ ...a, [q.id]: o }))} />
                      <span className="option__letter">{String.fromCharCode(65 + o)}</span>
                      <span>{option}</span>
                      {submitted && o === q.answer && <Icon name="check" size={16} className="option__icon" />}
                      {submitted && o === chosen && o !== q.answer && <Icon name="x" size={16} className="option__icon" />}
                    </label>
                  )
                })}
              </div>
              {submitted && (
                <p className={`explanation ${chosen === q.answer ? 'is-correct' : 'is-wrong'}`}>
                  <strong>{chosen === q.answer ? 'Correct.' : 'Explanation:'}</strong> {q.explanation}
                </p>
              )}
            </fieldset>
          )
        })}
        {!submitted && (
          <div className="quiz__submit">
            <span className="muted">
              {answered}/{total} answered
            </span>
            <button className="button button--primary button--large" disabled={answered < total}>
              Submit answers
            </button>
          </div>
        )}
      </form>
    </div>
  )
}
