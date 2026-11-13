import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CourseCard from '../components/CourseCard.jsx'
import CourseLogo from '../components/CourseLogo.jsx'
import Icon from '../components/Icon.jsx'
import { ProgressBar, SectionHeader } from '../components/ui.jsx'
import { useLearning } from '../context/learningContext.js'
import { categories, courses, featuredIds, getCourse } from '../data/courses/index.js'
import paths from '../data/paths.js'
import useDocumentTitle from '../hooks/useDocumentTitle.js'

const totalLessons = courses.reduce((sum, c) => sum + c.lessons.length, 0)
const totalQuestions = courses.reduce((sum, c) => sum + c.quiz.length, 0)

const STEPS = [
  ['book', 'Pick a skill', 'Choose from 35 courses across web, mobile, data, cloud and CS fundamentals.'],
  ['code', 'Learn by doing', 'Every class has a worked example. Run JavaScript, HTML and Python right in the page.'],
  ['file', 'Read & download notes', 'Each skill has full docs, a cheat sheet and notes you can save or print.'],
  ['award', 'Pass the quiz, get certified', 'Finish all classes, score 75% and download your certificate.'],
]

export default function Home() {
  useDocumentTitle('')
  const { enrolled, lastLesson, progressById } = useLearning()
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const inProgress = Object.keys(enrolled)
    .map(getCourse)
    .filter((c) => c && !progressById[c.id].certified)
    .slice(0, 3)

  const marquee = courses.filter((c) => c.id !== 'systemdesign' && c.id !== 'cybersecurity')

  return (
    <div className="home">
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="eyebrow">
              <Icon name="zap" size={14} /> {courses.length} programming skills · 100% free
            </p>
            <h1>
              Learn to code by <span className="gradient-text">writing real code</span>.
            </h1>
            <p className="hero__lead">
              Short classes, live code editors, complete docs and downloadable notes for every major technology, from HTML to
              Kubernetes.
            </p>
            <form
              className="hero__search"
              role="search"
              onSubmit={(e) => {
                e.preventDefault()
                navigate(`/courses?q=${encodeURIComponent(query.trim())}`)
              }}
            >
              <Icon name="search" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What do you want to learn? Try “Python” or “Docker”"
                aria-label="Search courses"
              />
              <button className="button button--primary">Search</button>
            </form>
            <div className="hero__stats">
              <div><strong>{courses.length}</strong><span>courses</span></div>
              <div><strong>{totalLessons}</strong><span>classes</span></div>
              <div><strong>{totalQuestions}</strong><span>quiz questions</span></div>
              <div><strong>{paths.length}</strong><span>career paths</span></div>
            </div>
          </div>
          <div className="hero__logos" aria-hidden="true">
            {marquee.slice(0, 16).map((course, i) => (
              <span key={course.id} className="hero__logo" style={{ animationDelay: `${(i % 8) * 0.4}s` }}>
                <CourseLogo course={course} size={56} />
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="logo-strip" aria-label="Skills you can learn">
        <div className="logo-strip__track">
          {[...marquee, ...marquee].map((course, i) => (
            <Link key={`${course.id}-${i}`} to={`/courses/${course.id}`} className="logo-strip__item" tabIndex={i >= marquee.length ? -1 : 0}>
              <CourseLogo course={course} size={30} />
              <span>{course.title.split(/[ &:(]/)[0]}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="container">
        {inProgress.length > 0 && (
          <section className="section">
            <SectionHeader title="Continue learning" action={<Link to="/dashboard" className="link">My learning →</Link>} />
            <div className="continue-grid">
              {inProgress.map((course) => {
                const p = progressById[course.id]
                const next = lastLesson[course.id] ?? '1'
                return (
                  <Link key={course.id} to={`/learn/${course.id}/${next}`} className="continue-card">
                    <CourseLogo course={course} size={44} />
                    <div>
                      <strong>{course.title}</strong>
                      <span className="muted">
                        {p.done}/{p.total} classes · {p.percent}%
                      </span>
                      <ProgressBar percent={p.percent} color={course.color} label={`${course.title} progress`} />
                    </div>
                    <Icon name="play" size={16} />
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        <section className="section">
          <SectionHeader title="Browse by category" subtitle="Every major area of software development, in one place." />
          <div className="category-grid">
            {categories.map((cat) => {
              const list = courses.filter((c) => c.category === cat.id)
              return (
                <Link key={cat.id} to={`/courses?cat=${cat.id}`} className="category-card">
                  <div className="category-card__logos">
                    {list.slice(0, 4).map((c) => (
                      <CourseLogo key={c.id} course={c} size={34} />
                    ))}
                  </div>
                  <h3>{cat.label}</h3>
                  <p className="muted">{cat.blurb}</p>
                  <span className="category-card__count">{list.length} courses →</span>
                </Link>
              )
            })}
          </div>
        </section>

        <section className="section">
          <SectionHeader title="Most popular courses" action={<Link to="/courses" className="link">View all {courses.length} →</Link>} />
          <div className="course-grid">
            {featuredIds.map((id) => (
              <CourseCard key={id} course={getCourse(id)} />
            ))}
          </div>
        </section>

        <section className="section">
          <SectionHeader title="How CodeVidya works" />
          <ol className="steps">
            {STEPS.map(([icon, title, text], i) => (
              <li key={title} className="step">
                <span className="step__icon">
                  <Icon name={icon} size={22} />
                </span>
                <span className="step__num">Step {i + 1}</span>
                <h3>{title}</h3>
                <p className="muted">{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="section">
          <SectionHeader title="Follow a career path" action={<Link to="/paths" className="link">All paths →</Link>} />
          <div className="path-preview-grid">
            {paths.slice(0, 4).map((path) => (
              <Link key={path.id} to={`/paths#${path.id}`} className="path-preview" style={{ '--path-color': path.color }}>
                <h3>{path.title}</h3>
                <p className="muted">{path.summary}</p>
                <div className="path-preview__logos">
                  {path.courses.map((id) => (
                    <CourseLogo key={id} course={getCourse(id)} size={30} />
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="cta">
          <div>
            <h2>Need a quick reference?</h2>
            <p>Read the full documentation for any skill, or download the complete notes as a Markdown file.</p>
          </div>
          <div className="cta__actions">
            <Link to="/docs" className="button button--light">
              <Icon name="file" size={16} /> Open the docs library
            </Link>
            <Link to="/playground" className="button button--outline-light">
              <Icon name="code" size={16} /> Code playground
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
