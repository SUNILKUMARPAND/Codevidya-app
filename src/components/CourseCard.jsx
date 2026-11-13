import { Link } from 'react-router-dom'
import { useLearning } from '../context/learningContext.js'
import { formatMinutes } from '../utils/format.js'
import CourseLogo from './CourseLogo.jsx'
import Icon from './Icon.jsx'
import { LevelTag, ProgressBar } from './ui.jsx'

export default function CourseCard({ course }) {
  const { progressById, enrolled, bookmarks, toggleBookmark } = useLearning()
  const progress = progressById[course.id]
  const isEnrolled = Boolean(enrolled[course.id])
  const saved = bookmarks.includes(course.id)

  return (
    <article className="course-card" style={{ '--course-color': course.color }}>
      <div className="course-card__top">
        <CourseLogo course={course} size={52} />
        <button
          type="button"
          className={`icon-button icon-button--small bookmark ${saved ? 'is-active' : ''}`}
          onClick={() => toggleBookmark(course.id)}
          aria-label={saved ? `Remove ${course.title} from wishlist` : `Save ${course.title} to wishlist`}
          aria-pressed={saved}
        >
          <Icon name="bookmark" size={16} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>
      <p className="course-card__category">{course.categoryLabel}</p>
      <h3 className="course-card__title">
        <Link to={`/courses/${course.id}`} className="stretched-link">
          {course.title}
        </Link>
      </h3>
      <p className="course-card__tagline muted">{course.tagline}</p>
      <div className="course-card__meta">
        <LevelTag level={course.level} />
        <span>
          <Icon name="layers" size={14} /> {course.lessons.length} classes
        </span>
        <span>
          <Icon name="clock" size={14} /> {formatMinutes(course.minutes)}
        </span>
      </div>
      {isEnrolled && (
        <div className="course-card__progress">
          <ProgressBar percent={progress.percent} label={`${course.title} progress`} color={course.color} />
          <span>{progress.certified ? 'Certified' : `${progress.percent}%`}</span>
        </div>
      )}
    </article>
  )
}
