import { Link } from 'react-router-dom'
import { splitInlineCode } from '../utils/format.js'
import Icon from './Icon.jsx'

// Small shared building blocks

export function ProgressBar({ percent, label, color }) {
  return (
    <div
      className="progress"
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? 'Progress'}
    >
      <span className="progress__fill" style={{ width: `${percent}%`, background: color }} />
    </div>
  )
}

// Text with `inline code` rendered as <code>
export function RichText({ text }) {
  return splitInlineCode(text).map((part) => (part.code ? <code key={part.key}>{part.text}</code> : part.text))
}

export function LevelTag({ level }) {
  return <span className={`level level--${level.toLowerCase()}`}>{level}</span>
}

export function EmptyState({ icon = 'book', title, children, action }) {
  return (
    <div className="empty">
      <span className="empty__icon">
        <Icon name={icon} size={26} />
      </span>
      <h3>{title}</h3>
      {children && <p className="muted">{children}</p>}
      {action}
    </div>
  )
}

export function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={item.label}>
          {i > 0 && <span className="breadcrumbs__sep">/</span>}
          {item.to ? <Link to={item.to}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
        </span>
      ))}
    </nav>
  )
}

export function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="section-header">
      <div>
        <h2>{title}</h2>
        {subtitle && <p className="muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}
