import { Link, useParams } from 'react-router-dom'
import CourseLogo from '../components/CourseLogo.jsx'
import Icon from '../components/Icon.jsx'
import { Breadcrumbs } from '../components/ui.jsx'
import { PASS_MARK, useLearning } from '../context/learningContext.js'
import { getCourse } from '../data/courses/index.js'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import { certificateId, formatDate } from '../utils/format.js'
import NotFound from './NotFound.jsx'

export default function Certificate() {
  const { courseId } = useParams()
  const course = getCourse(courseId)
  useDocumentTitle(course ? `${course.title} certificate` : 'Certificate')
  const { progressById, quizzes, learnerName, setLearnerName } = useLearning()

  if (!course) return <NotFound />
  const progress = progressById[course.id]

  if (!progress.certified) {
    return (
      <div className="container page page--narrow">
        <Breadcrumbs items={[{ label: 'Courses', to: '/courses' }, { label: course.title, to: `/courses/${course.id}` }, { label: 'Certificate' }]} />
        <section className="panel locked-cert">
          <Icon name="lock" size={32} />
          <h1>Your certificate is almost within reach</h1>
          <p className="muted">Finish both steps to unlock the {course.title} certificate.</p>
          <ul className="requirements requirements--large">
            <li className={progress.lessonsDone ? 'is-met' : ''}>
              <Icon name={progress.lessonsDone ? 'check' : 'lock'} size={16} /> Complete all classes ({progress.done}/{progress.total})
            </li>
            <li className={progress.quizPassed ? 'is-met' : ''}>
              <Icon name={progress.quizPassed ? 'check' : 'lock'} size={16} /> Pass the quiz with {PASS_MARK * 100}% or more
              {progress.quizBest !== null && ` (best so far: ${Math.round(progress.quizBest * 100)}%)`}
            </li>
          </ul>
          <div className="stack-row">
            {!progress.lessonsDone && (
              <Link to={`/courses/${course.id}`} className="button button--primary">
                Continue classes
              </Link>
            )}
            {!progress.quizPassed && (
              <Link to={`/quiz/${course.id}`} className="button button--ghost">
                Take the quiz
              </Link>
            )}
          </div>
        </section>
      </div>
    )
  }

  const issued = quizzes[course.id].passedAt
  const name = learnerName.trim() || 'Your Name'
  const id = certificateId(course.id, name, issued.slice(0, 10))

  return (
    <div className="container page">
      <div className="no-print">
        <Breadcrumbs items={[{ label: 'Courses', to: '/courses' }, { label: course.title, to: `/courses/${course.id}` }, { label: 'Certificate' }]} />
        <div className="cert-tools">
          <label>
            Name on certificate
            <input value={learnerName} onChange={(e) => setLearnerName(e.target.value)} placeholder="Type your full name" maxLength={60} />
          </label>
          <button type="button" className="button button--primary" onClick={() => window.print()}>
            <Icon name="printer" size={16} /> Print / Save as PDF
          </button>
        </div>
      </div>

      <div className="certificate" style={{ '--course-color': course.color }}>
        <div className="certificate__border">
          <div className="certificate__brand">
            <span className="brand__mark">&lt;/&gt;</span> CodeVidya
          </div>
          <p className="certificate__kicker">Certificate of Completion</p>
          <p className="certificate__line">This certifies that</p>
          <h2 className="certificate__name">{name}</h2>
          <p className="certificate__line">has successfully completed all classes and passed the final assessment of</p>
          <div className="certificate__course">
            <CourseLogo course={course} size={52} />
            <h3>{course.title}</h3>
          </div>
          <p className="certificate__details">
            {course.level} · {course.lessons.length} classes · ~{course.hours} hours · Quiz score {Math.round(progress.quizBest * 100)}%
          </p>
          <div className="certificate__footer">
            <div>
              <strong>{formatDate(issued)}</strong>
              <span>Date issued</span>
            </div>
            <div className="certificate__seal" aria-hidden="true">
              <Icon name="award" size={40} />
            </div>
            <div>
              <strong>{id}</strong>
              <span>Certificate ID</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
