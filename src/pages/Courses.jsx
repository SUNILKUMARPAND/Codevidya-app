import { useSearchParams } from 'react-router-dom'
import CourseCard from '../components/CourseCard.jsx'
import Icon from '../components/Icon.jsx'
import { EmptyState } from '../components/ui.jsx'
import { categories, courses, featuredIds, levels } from '../data/courses/index.js'
import useDocumentTitle from '../hooks/useDocumentTitle.js'

const SORTS = {
  popular: { label: 'Most popular', fn: (a, b) => rank(a) - rank(b) },
  az: { label: 'A → Z', fn: (a, b) => a.title.localeCompare(b.title) },
  short: { label: 'Shortest first', fn: (a, b) => a.minutes - b.minutes },
  level: { label: 'Beginner first', fn: (a, b) => levels.indexOf(a.level) - levels.indexOf(b.level) },
}

// Featured courses first, then the rest in catalogue order
function rank(course) {
  const i = featuredIds.indexOf(course.id)
  return i === -1 ? 100 + courses.indexOf(course) : i
}

function matches(course, q) {
  if (!q) return true
  const haystack = [course.title, course.tagline, course.description, course.categoryLabel, ...course.outcomes, ...course.lessons.map((l) => l.title)]
    .join(' ')
    .toLowerCase()
  return q
    .toLowerCase()
    .split(/\s+/)
    .every((word) => haystack.includes(word))
}

export default function Courses() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const cat = params.get('cat') ?? ''
  const level = params.get('level') ?? ''
  const sort = SORTS[params.get('sort')] ? params.get('sort') : 'popular'
  useDocumentTitle(q ? `“${q}” courses` : 'All courses')

  // Keep filters in the URL so results can be shared and survive a refresh
  function update(key, value) {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const results = courses
    .filter((c) => (!cat || c.category === cat) && (!level || c.level === level) && matches(c, q))
    .sort(SORTS[sort].fn)

  const activeCategory = categories.find((c) => c.id === cat)

  return (
    <div className="container page">
      <header className="page-header">
        <h1>{activeCategory ? activeCategory.label : 'Explore all courses'}</h1>
        <p className="muted">{activeCategory ? activeCategory.blurb : 'Every course includes hands-on classes, readable docs, a quiz and a certificate.'}</p>
      </header>

      <div className="filters">
        <label className="filters__search">
          <Icon name="search" size={16} />
          <input type="search" value={q} onChange={(e) => update('q', e.target.value)} placeholder="Search courses, topics, lessons…" aria-label="Search courses" />
        </label>
        <select value={level} onChange={(e) => update('level', e.target.value)} aria-label="Filter by level">
          <option value="">All levels</option>
          {levels.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
        <select value={sort} onChange={(e) => update('sort', e.target.value === 'popular' ? '' : e.target.value)} aria-label="Sort courses">
          {Object.entries(SORTS).map(([key, s]) => (
            <option key={key} value={key}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="chips" role="group" aria-label="Filter by category">
        <button type="button" className={`chip ${!cat ? 'is-active' : ''}`} onClick={() => update('cat', '')} aria-pressed={!cat}>
          All <span>{courses.length}</span>
        </button>
        {categories.map((c) => (
          <button key={c.id} type="button" className={`chip ${cat === c.id ? 'is-active' : ''}`} onClick={() => update('cat', c.id)} aria-pressed={cat === c.id}>
            {c.label} <span>{courses.filter((x) => x.category === c.id).length}</span>
          </button>
        ))}
      </div>

      <p className="results-count muted" aria-live="polite">
        Showing {results.length} of {courses.length} courses
      </p>

      {results.length ? (
        <div className="course-grid">
          {results.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="search"
          title="No courses match your filters"
          action={
            <button type="button" className="button button--primary" onClick={() => setParams({})}>
              Clear filters
            </button>
          }
        >
          Try a different search term or remove a filter.
        </EmptyState>
      )}
    </div>
  )
}
