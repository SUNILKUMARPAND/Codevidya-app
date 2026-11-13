import { useState } from 'react'
import { Link } from 'react-router-dom'
import CourseLogo from '../components/CourseLogo.jsx'
import Icon from '../components/Icon.jsx'
import { EmptyState } from '../components/ui.jsx'
import { categories, courses } from '../data/courses/index.js'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import { allCoursesToMarkdown, courseToMarkdown, downloadText } from '../utils/notes.js'

export default function DocsLibrary() {
  useDocumentTitle('Docs & notes')
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()

  // Search titles, cheat sheets and key terms so "useState" or "chmod" finds the right docs
  const filtered = courses.filter((c) => {
    if (!q) return true
    const text = [c.title, c.tagline, ...c.lessons.map((l) => l.title), ...c.reference.cheatsheet.flat(), ...c.reference.terms.flat()]
      .join(' ')
      .toLowerCase()
    return text.includes(q)
  })

  return (
    <div className="container page">
      <header className="page-header page-header--row">
        <div>
          <h1>Docs & notes library</h1>
          <p className="muted">
            Readable documentation for all {courses.length} skills: every class, setup steps, a cheat sheet, key terms, practice questions and official links. Download any
            of them as Markdown notes, or print them as PDF.
          </p>
        </div>
        <button type="button" className="button button--primary" onClick={() => downloadText('codevidya-all-notes.md', allCoursesToMarkdown(courses))}>
          <Icon name="download" size={16} /> Download all notes
        </button>
      </header>

      <label className="filters__search filters__search--wide">
        <Icon name="search" size={16} />
        <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search docs: try “useState”, “JOIN”, “chmod”, “ownership”…" aria-label="Search documentation" />
      </label>

      {filtered.length === 0 && <EmptyState icon="search" title="Nothing found">No docs mention “{query}”.</EmptyState>}

      {categories.map((cat) => {
        const list = filtered.filter((c) => c.category === cat.id)
        if (!list.length) return null
        return (
          <section key={cat.id} className="section docs-group">
            <h2 className="section-title">{cat.label}</h2>
            <div className="docs-grid">
              {list.map((course) => (
                <article key={course.id} className="doc-card">
                  <div className="doc-card__head">
                    <CourseLogo course={course} size={40} />
                    <div>
                      <h3>
                        <Link to={`/docs/${course.id}`}>{course.title}</Link>
                      </h3>
                      <p className="muted">
                        {course.lessons.length} classes · {course.reference.cheatsheet.length} cheat-sheet entries · {course.quiz.length} practice Qs
                      </p>
                    </div>
                  </div>
                  <ul className="doc-card__topics">
                    {course.lessons.map((l) => (
                      <li key={l.id}>
                        <Link to={`/docs/${course.id}#lesson-${l.id}`}>{l.title}</Link>
                      </li>
                    ))}
                  </ul>
                  <div className="doc-card__actions">
                    <Link to={`/docs/${course.id}`} className="button button--ghost button--small">
                      <Icon name="book" size={14} /> Read
                    </Link>
                    <button type="button" className="button button--ghost button--small" onClick={() => downloadText(`${course.id}-notes.md`, courseToMarkdown(course))}>
                      <Icon name="download" size={14} /> Notes .md
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
