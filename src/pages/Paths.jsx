import { Link } from 'react-router-dom'
import CourseLogo from '../components/CourseLogo.jsx'
import Icon from '../components/Icon.jsx'
import { LevelTag, ProgressBar } from '../components/ui.jsx'
import { useLearning } from '../context/learningContext.js'
import { getCourse } from '../data/courses/index.js'
import paths from '../data/paths.js'
import useDocumentTitle from '../hooks/useDocumentTitle.js'

export default function Paths() {
  useDocumentTitle('Career paths')
  const { progressById } = useLearning()

  return (
    <div className="container page">
      <header className="page-header">
        <h1>Career learning paths</h1>
        <p className="muted">Not sure where to start? Follow a step-by-step path built around a real developer role.</p>
      </header>

      <div className="paths">
        {paths.map((path) => {
          const list = path.courses.map(getCourse)
          const lessonsTotal = list.reduce((s, c) => s + c.lessons.length, 0)
          const lessonsDone = list.reduce((s, c) => s + progressById[c.id].done, 0)
          const percent = Math.round((lessonsDone / lessonsTotal) * 100)
          const next = list.find((c) => !progressById[c.id].certified)
          const hours = list.reduce((s, c) => s + c.hours, 0)

          return (
            <section key={path.id} id={path.id} className="path" style={{ '--path-color': path.color }}>
              <header className="path__header">
                <div>
                  <h2>{path.title}</h2>
                  <p className="muted">{path.summary}</p>
                  <p className="path__meta">
                    {list.length} courses · {lessonsTotal} classes · ~{hours} hours
                  </p>
                </div>
                <div className="path__progress">
                  <span>{percent}% complete</span>
                  <ProgressBar percent={percent} color={path.color} label={`${path.title} progress`} />
                  {next ? (
                    <Link to={`/courses/${next.id}`} className="button button--primary button--small">
                      {lessonsDone ? 'Continue' : 'Start'}: {next.title.split(/[:&(]/)[0].trim()} <Icon name="arrowRight" size={14} />
                    </Link>
                  ) : (
                    <span className="badge-done">
                      <Icon name="award" size={14} /> Path completed
                    </span>
                  )}
                </div>
              </header>
              <ol className="path__steps">
                {list.map((course, i) => {
                  const p = progressById[course.id]
                  return (
                    <li key={course.id} className={`path__step ${p.certified ? 'is-done' : ''}`}>
                      <Link to={`/courses/${course.id}`}>
                        <span className="path__index">{p.certified ? <Icon name="check" size={14} /> : i + 1}</span>
                        <CourseLogo course={course} size={36} />
                        <span className="path__step-text">
                          <strong>{course.title}</strong>
                          <span>
                            <LevelTag level={course.level} /> {p.done}/{p.total} classes
                          </span>
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ol>
            </section>
          )
        })}
      </div>
    </div>
  )
}
