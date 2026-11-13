import { useState } from 'react'
import { logoUrl } from '../data/logos.js'

// The skill's real logo on a white tile (so dark logos like Next.js and Rust
// stay visible in dark mode). Falls back to a coloured badge if there is no
// logo or the image fails to load.
export default function CourseLogo({ course, size = 48 }) {
  const url = logoUrl(course.id)
  const [failedUrl, setFailedUrl] = useState(null)
  const style = { '--logo-size': `${size}px`, '--course-color': course.color }

  if (!url || failedUrl === url) {
    return (
      <span className="course-logo course-logo--badge" style={style} aria-hidden="true">
        {course.icon}
      </span>
    )
  }

  return (
    <span className="course-logo" style={style}>
      <img src={url} alt={`${course.title} logo`} loading="lazy" onError={() => setFailedUrl(url)} />
    </span>
  )
}
