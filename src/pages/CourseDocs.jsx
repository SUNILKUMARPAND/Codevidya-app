import { Link, useParams } from 'react-router-dom'
import CodeBlock from '../components/CodeBlock.jsx'
import CourseLogo from '../components/CourseLogo.jsx'
import Icon from '../components/Icon.jsx'
import { Breadcrumbs, LevelTag, RichText } from '../components/ui.jsx'
import { useLearning } from '../context/learningContext.js'
import { getCourse } from '../data/courses/index.js'
import setup from '../data/setup.js'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import { formatMinutes } from '../utils/format.js'
import { courseToMarkdown, downloadText, lessonFileName } from '../utils/notes.js'
import NotFound from './NotFound.jsx'

// The complete, readable documentation for one skill: a single long page
// that prints cleanly and can be downloaded as Markdown notes.
export default function CourseDocs() {
  const { courseId } = useParams()
  const course = getCourse(courseId)
  useDocumentTitle(course ? `${course.title} documentation` : 'Docs')
  const { isComplete } = useLearning()

  if (!course) return <NotFound />

  const { cheatsheet, terms, links } = course.reference
  const [setupText, setupCommands] = setup[course.id] ?? []
  const toc = [
    ['overview', 'Overview'],
    ['setup', 'Setup'],
    ...course.lessons.map((l) => [`lesson-${l.id}`, `${l.number}. ${l.title}`]),
    ['cheatsheet', 'Cheat sheet'],
    ['terms', 'Key terms'],
    ['practice', 'Practice questions'],
    ['resources', 'Resources'],
  ]

  return (
    <div className="container page docs-layout">
      <aside className="docs-toc no-print" aria-label="On this page">
        <p className="docs-toc__title">On this page</p>
        <nav>
          {toc.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
      </aside>

      <article className="doc">
        <div className="no-print">
          <Breadcrumbs items={[{ label: 'Docs & Notes', to: '/docs' }, { label: course.title }]} />
        </div>

        <header className="doc__header">
          <CourseLogo course={course} size={64} />
          <div>
            <p className="doc__kicker">{course.categoryLabel} · Documentation</p>
            <h1>{course.title}</h1>
            <p className="doc__tagline">{course.tagline}</p>
            <p className="doc__meta">
              <LevelTag level={course.level} /> {course.lessons.length} classes · {formatMinutes(course.minutes)} read
            </p>
          </div>
        </header>

        <div className="doc__actions no-print">
          <button type="button" className="button button--primary" onClick={() => downloadText(`${course.id}-notes.md`, courseToMarkdown(course))}>
            <Icon name="download" size={16} /> Download notes (.md)
          </button>
          <button type="button" className="button button--ghost" onClick={() => window.print()}>
            <Icon name="printer" size={16} /> Print / Save as PDF
          </button>
          <Link to={`/learn/${course.id}/1`} className="button button--ghost">
            <Icon name="play" size={16} /> Start the classes
          </Link>
        </div>

        <section id="overview" className="doc__section">
          <h2>Overview</h2>
          <p>{course.description}</p>
          <h3>Learning outcomes</h3>
          <ul>
            {course.outcomes.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </section>

        {setupText && (
          <section id="setup" className="doc__section">
            <h2>Setup: running the code locally</h2>
            <p>{setupText}</p>
            <CodeBlock code={setupCommands} lang="bash" />
          </section>
        )}

        {course.modules.map((module, m) => (
          <section key={module.title} className="doc__section">
            <p className="doc__module">
              Module {m + 1}: {module.title}
            </p>
            {module.lessons.map((lesson) => (
              <div key={lesson.id} id={`lesson-${lesson.id}`} className="doc__lesson">
                <h2>
                  {lesson.number}. {lesson.title}
                  {isComplete(course.id, lesson.id) && (
                    <span className="doc__done no-print">
                      <Icon name="check" size={13} /> done
                    </span>
                  )}
                </h2>
                <p>
                  <RichText text={lesson.body} />
                </p>
                <CodeBlock code={lesson.code} lang={course.lang} filename={lessonFileName(course, lesson)} />
                <Link to={`/learn/${course.id}/${lesson.id}`} className="link no-print">
                  {course.runnable ? 'Run this example in the class →' : 'Open this class →'}
                </Link>
              </div>
            ))}
          </section>
        ))}

        <section id="cheatsheet" className="doc__section">
          <h2>Cheat sheet</h2>
          <div className="table-wrap">
            <table className="cheatsheet">
              <thead>
                <tr>
                  <th scope="col">Syntax</th>
                  <th scope="col">What it does</th>
                </tr>
              </thead>
              <tbody>
                {cheatsheet.map(([syntax, meaning]) => (
                  <tr key={syntax}>
                    <td>
                      <code>{syntax}</code>
                    </td>
                    <td>{meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="terms" className="doc__section">
          <h2>Key terms</h2>
          <dl className="glossary">
            {terms.map(([term, definition]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{definition}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="practice" className="doc__section">
          <h2>Practice questions</h2>
          <p className="muted no-print">Try each one, then reveal the answer. Take the scored quiz to earn your certificate.</p>
          <ol className="practice">
            {course.quiz.map((q) => (
              <li key={q.id}>
                <p>{q.question}</p>
                <ul>
                  {q.options.map((o, i) => (
                    <li key={o}>
                      {String.fromCharCode(65 + i)}) {o}
                    </li>
                  ))}
                </ul>
                <details>
                  <summary>Show answer</summary>
                  <p>
                    <strong>
                      {String.fromCharCode(65 + q.answer)}) {q.options[q.answer]}
                    </strong>
                    . {q.explanation}
                  </p>
                </details>
              </li>
            ))}
          </ol>
          <Link to={`/quiz/${course.id}`} className="button button--primary no-print">
            <Icon name="help" size={16} /> Take the scored quiz
          </Link>
        </section>

        <section id="resources" className="doc__section">
          <h2>Official documentation & resources</h2>
          <ul className="link-list">
            {links.map(([label, url]) => (
              <li key={url}>
                <a href={url} target="_blank" rel="noreferrer">
                  {label} <Icon name="external" size={13} />
                </a>
                <span className="muted print-only"> {url}</span>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  )
}
