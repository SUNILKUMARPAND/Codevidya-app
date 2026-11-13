import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CodeBlock from '../components/CodeBlock.jsx'
import CodeRunner from '../components/CodeRunner.jsx'
import CourseLogo from '../components/CourseLogo.jsx'
import Icon from '../components/Icon.jsx'
import { ProgressBar, RichText } from '../components/ui.jsx'
import { lessonKey, useLearning } from '../context/learningContext.js'
import { getCourse, getLesson } from '../data/courses/index.js'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import { lessonFileName } from '../utils/notes.js'
import NotFound from './NotFound.jsx'

export default function Lesson() {
  const { courseId, lessonId } = useParams()
  const course = getCourse(courseId)
  const lesson = getLesson(course, lessonId)
  useDocumentTitle(lesson ? `${lesson.title} · ${course.title}` : 'Class not found')
  const { visitLesson, isComplete, toggleComplete, progressById, notes, saveNote } = useLearning()
  const navigate = useNavigate()
  const [outlineOpen, setOutlineOpen] = useState(false)

  useEffect(() => {
    if (lesson) visitLesson(course.id, lesson.id)
  }, [course, lesson, visitLesson])

  if (!course || !lesson) return <NotFound />

  const index = lesson.number - 1
  const prev = course.lessons[index - 1]
  const next = course.lessons[index + 1]
  const done = isComplete(course.id, lesson.id)
  const progress = progressById[course.id]

  function completeAndContinue() {
    if (!done) toggleComplete(course.id, lesson.id)
    navigate(next ? `/learn/${course.id}/${next.id}` : `/quiz/${course.id}`)
  }

  return (
    <div className="lesson-layout">
      <aside className={`lesson-outline ${outlineOpen ? 'is-open' : ''}`} aria-label="Course outline">
        <Link to={`/courses/${course.id}`} className="lesson-outline__course">
          <CourseLogo course={course} size={36} />
          <span>
            <strong>{course.title}</strong>
            <span className="muted">
              {progress.done}/{progress.total} complete
            </span>
          </span>
        </Link>
        <ProgressBar percent={progress.percent} color={course.color} label="Course progress" />
        {course.modules.map((module, m) => (
          <div key={module.title} className="lesson-outline__module">
            <p className="lesson-outline__module-title">
              Module {m + 1} · {module.title}
            </p>
            {module.lessons.map((l) => (
              <Link
                key={l.id}
                to={`/learn/${course.id}/${l.id}`}
                className={`lesson-outline__item ${l.id === lesson.id ? 'is-current' : ''} ${isComplete(course.id, l.id) ? 'is-done' : ''}`}
                aria-current={l.id === lesson.id ? 'page' : undefined}
                onClick={() => setOutlineOpen(false)}
              >
                <span className="lesson-outline__dot">{isComplete(course.id, l.id) ? <Icon name="check" size={12} /> : l.number}</span>
                {l.title}
              </Link>
            ))}
          </div>
        ))}
        <div className="lesson-outline__module">
          <p className="lesson-outline__module-title">Finish</p>
          <Link to={`/quiz/${course.id}`} className={`lesson-outline__item ${progress.quizPassed ? 'is-done' : ''}`}>
            <span className="lesson-outline__dot"><Icon name="help" size={12} /></span> Course quiz
          </Link>
          <Link to={`/docs/${course.id}`} className="lesson-outline__item">
            <span className="lesson-outline__dot"><Icon name="file" size={12} /></span> Full docs & notes
          </Link>
        </div>
      </aside>

      <article className="lesson">
        <button type="button" className="button button--ghost button--small lesson__outline-toggle" onClick={() => setOutlineOpen((o) => !o)} aria-expanded={outlineOpen}>
          <Icon name="list" size={15} /> {outlineOpen ? 'Hide' : 'Show'} course outline
        </button>

        <p className="lesson__eyebrow">
          {course.title} · Module: {lesson.module} · Class {lesson.number} of {course.lessons.length}
        </p>
        <h1>{lesson.title}</h1>
        <p className="lesson__meta muted">
          <Icon name="clock" size={14} /> {lesson.minutes} min
          {done && (
            <span className="lesson__done">
              <Icon name="check" size={14} /> Completed
            </span>
          )}
        </p>

        <div className="lesson__body">
          <p>
            <RichText text={lesson.body} />
          </p>
        </div>

        <h2 className="lesson__section-title">Example</h2>
        {course.runnable ? (
          <>
            <CodeRunner key={lessonKey(course.id, lesson.id)} initialCode={lesson.code} lang={course.lang} />
            {course.lang === 'python' && (
              <p className="muted lesson__hint">
                Python runs in your browser via Pyodide (WebAssembly). Code that opens windows, such as charts, or reads files from your computer is best run locally.
              </p>
            )}
          </>
        ) : (
          <>
            <CodeBlock code={lesson.code} lang={course.lang} filename={lessonFileName(course, lesson)} />
            <p className="muted lesson__hint">
              <Icon name="terminal" size={14} /> Copy or save this example and run it locally. See the{' '}
              <Link to={`/docs/${course.id}#setup`} className="link">setup notes</Link> in the docs.
            </p>
          </>
        )}

        <section className="lesson__notes">
          <label htmlFor="lesson-notes">
            <Icon name="edit" size={16} /> My notes for this class
          </label>
          <textarea
            id="lesson-notes"
            key={lessonKey(course.id, lesson.id)}
            defaultValue={notes[lessonKey(course.id, lesson.id)] ?? ''}
            onBlur={(e) => saveNote(course.id, lesson.id, e.target.value)}
            placeholder="Write what you learned in your own words. Notes save automatically and appear in your dashboard."
            rows={4}
          />
        </section>

        <footer className="lesson__footer">
          {prev ? (
            <Link to={`/learn/${course.id}/${prev.id}`} className="button button--ghost">
              <Icon name="arrowLeft" size={16} /> Previous
            </Link>
          ) : (
            <span />
          )}
          <div className="lesson__footer-right">
            <button type="button" className={`button ${done ? 'button--success' : 'button--ghost'}`} onClick={() => toggleComplete(course.id, lesson.id)} aria-pressed={done}>
              <Icon name="check" size={16} /> {done ? 'Completed' : 'Mark complete'}
            </button>
            <button type="button" className="button button--primary" onClick={completeAndContinue}>
              {next ? 'Complete & next' : 'Complete & take quiz'} <Icon name="arrowRight" size={16} />
            </button>
          </div>
        </footer>
      </article>
    </div>
  )
}
