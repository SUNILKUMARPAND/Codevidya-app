import { Link, useParams } from 'react-router-dom'
import CourseCard from '../components/CourseCard.jsx'
import CourseLogo from '../components/CourseLogo.jsx'
import Icon from '../components/Icon.jsx'
import { Breadcrumbs, LevelTag, ProgressBar } from '../components/ui.jsx'
import { PASS_MARK, useLearning } from '../context/learningContext.js'
import { courses, getCourse } from '../data/courses/index.js'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import { formatMinutes } from '../utils/format.js'
import { courseToMarkdown, downloadText } from '../utils/notes.js'
import NotFound from './NotFound.jsx'

export default function CourseDetail() {
  const { courseId } = useParams()
  const course = getCourse(courseId)
  useDocumentTitle(course?.title)
  const { enrolled, enroll, progressById, lastLesson, isComplete, bookmarks, toggleBookmark } = useLearning()

  if (!course) return <NotFound />

  const progress = progressById[course.id]
  const isEnrolled = Boolean(enrolled[course.id])
  const firstUnfinished = course.lessons.find((l) => !isComplete(course.id, l.id))
  const resumeId = lastLesson[course.id] ?? firstUnfinished?.id ?? '1'
  const saved = bookmarks.includes(course.id)
  const related = courses.filter((c) => c.category === course.category && c.id !== course.id).slice(0, 4)

  return (
    <div className="course-page">
      <section className="course-hero" style={{ '--course-color': course.color }}>
        <div className="container">
          <Breadcrumbs items={[{ label: 'Courses', to: '/courses' }, { label: course.categoryLabel, to: `/courses?cat=${course.category}` }, { label: course.title }]} />
          <div className="course-hero__inner">
            <CourseLogo course={course} size={88} />
            <div className="course-hero__copy">
              <h1>{course.title}</h1>
              <p className="course-hero__tagline">{course.tagline}</p>
              <div className="course-hero__meta">
                <LevelTag level={course.level} />
                <span><Icon name="layers" size={15} /> {course.lessons.length} classes</span>
                <span><Icon name="clock" size={15} /> {formatMinutes(course.minutes)} reading · ~{course.hours} h practice</span>
                <span><Icon name="help" size={15} /> {course.quiz.length}-question quiz</span>
                {course.runnable && <span className="badge-live"><Icon name="play" size={12} /> Runnable examples</span>}
              </div>
              <div className="course-hero__actions">
                <Link to={`/learn/${course.id}/${resumeId}`} className="button button--primary button--large" onClick={() => enroll(course.id)}>
                  <Icon name="play" size={16} /> {isEnrolled ? (progress.lessonsDone ? 'Review classes' : 'Continue learning') : 'Start learning, free'}
                </Link>
                <Link to={`/docs/${course.id}`} className="button button--ghost button--large">
                  <Icon name="file" size={16} /> Read the docs
                </Link>
                <button type="button" className={`icon-button bookmark ${saved ? 'is-active' : ''}`} onClick={() => toggleBookmark(course.id)} aria-pressed={saved} aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}>
                  <Icon name="bookmark" fill={saved ? 'currentColor' : 'none'} />
                </button>
              </div>
              {isEnrolled && (
                <div className="course-hero__progress">
                  <ProgressBar percent={progress.percent} color={course.color} label="Course progress" />
                  <span>
                    {progress.done}/{progress.total} classes complete
                    {progress.quizBest !== null && ` · best quiz score ${Math.round(progress.quizBest * 100)}%`}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container course-layout">
        <div className="course-main">
          <section className="panel">
            <h2>About this course</h2>
            <p>{course.description}</p>
            <h3 className="panel__subtitle">What you’ll learn</h3>
            <ul className="outcomes">
              {course.outcomes.map((o) => (
                <li key={o}>
                  <Icon name="check" size={16} /> {o}
                </li>
              ))}
            </ul>
          </section>

          <section className="panel">
            <h2>Curriculum</h2>
            <p className="muted">
              {course.modules.length} modules · {course.lessons.length} classes · {formatMinutes(course.minutes)}
            </p>
            <div className="curriculum">
              {course.modules.map((module, m) => (
                <div key={module.title} className="curriculum__module">
                  <h3>
                    <span>Module {m + 1}</span> {module.title}
                  </h3>
                  <ol>
                    {module.lessons.map((lesson) => {
                      const done = isComplete(course.id, lesson.id)
                      return (
                        <li key={lesson.id}>
                          <Link to={`/learn/${course.id}/${lesson.id}`} className={`curriculum__lesson ${done ? 'is-done' : ''}`} onClick={() => enroll(course.id)}>
                            <span className="curriculum__check">{done ? <Icon name="check" size={14} /> : lesson.number}</span>
                            <span className="curriculum__title">{lesson.title}</span>
                            <span className="muted">{lesson.minutes} min</span>
                          </Link>
                        </li>
                      )
                    })}
                  </ol>
                </div>
              ))}
              <div className="curriculum__module">
                <h3>
                  <span>Final</span> Assessment
                </h3>
                <ol>
                  <li>
                    <Link to={`/quiz/${course.id}`} className={`curriculum__lesson ${progress.quizPassed ? 'is-done' : ''}`}>
                      <span className="curriculum__check">{progress.quizPassed ? <Icon name="check" size={14} /> : <Icon name="help" size={14} />}</span>
                      <span className="curriculum__title">Course quiz ({course.quiz.length} questions, pass mark {PASS_MARK * 100}%)</span>
                      <span className="muted">{progress.quizBest !== null ? `Best ${Math.round(progress.quizBest * 100)}%` : '5 min'}</span>
                    </Link>
                  </li>
                </ol>
              </div>
            </div>
          </section>
        </div>

        <aside className="course-side">
          <section className="panel">
            <h2 className="panel__title-sm">
              <Icon name="file" size={18} /> Docs & notes
            </h2>
            <p className="muted">The complete written guide for {course.title}: every class, a cheat sheet, key terms and practice questions.</p>
            <ul className="mini-cheatsheet">
              {course.reference.cheatsheet.slice(0, 4).map(([syntax, meaning]) => (
                <li key={syntax}>
                  <code>{syntax}</code>
                  <span>{meaning}</span>
                </li>
              ))}
            </ul>
            <div className="stack">
              <Link to={`/docs/${course.id}`} className="button button--ghost button--block">
                <Icon name="book" size={16} /> Read full documentation
              </Link>
              <button type="button" className="button button--ghost button--block" onClick={() => downloadText(`${course.id}-notes.md`, courseToMarkdown(course))}>
                <Icon name="download" size={16} /> Download notes (.md)
              </button>
            </div>
          </section>

          <section className="panel">
            <h2 className="panel__title-sm">
              <Icon name="award" size={18} /> Certificate
            </h2>
            <ul className="requirements">
              <li className={progress.lessonsDone ? 'is-met' : ''}>
                <Icon name={progress.lessonsDone ? 'check' : 'lock'} size={15} /> Complete all {course.lessons.length} classes
              </li>
              <li className={progress.quizPassed ? 'is-met' : ''}>
                <Icon name={progress.quizPassed ? 'check' : 'lock'} size={15} /> Score {PASS_MARK * 100}% or more in the quiz
              </li>
            </ul>
            <Link to={`/certificate/${course.id}`} className={`button button--block ${progress.certified ? 'button--primary' : 'button--ghost'}`}>
              {progress.certified ? 'View your certificate' : 'Preview requirements'}
            </Link>
          </section>

          {course.reference.links.length > 0 && (
            <section className="panel">
              <h2 className="panel__title-sm">
                <Icon name="external" size={18} /> Official resources
              </h2>
              <ul className="link-list">
                {course.reference.links.map(([label, url]) => (
                  <li key={url}>
                    <a href={url} target="_blank" rel="noreferrer">
                      {label} <Icon name="external" size={13} />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>

      {related.length > 0 && (
        <section className="container section">
          <h2 className="section-title">More in {course.categoryLabel}</h2>
          <div className="course-grid">
            {related.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
