import { useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useLearning } from '../context/learningContext.js'
import Icon from './Icon.jsx'

const LINKS = [
  { to: '/courses', label: 'Courses', icon: 'book' },
  { to: '/paths', label: 'Paths', icon: 'route' },
  { to: '/docs', label: 'Docs & Notes', icon: 'file' },
  { to: '/playground', label: 'Playground', icon: 'code' },
  { to: '/dashboard', label: 'My Learning', icon: 'user' },
]

export default function Navbar() {
  const { theme, toggleTheme, stats } = useLearning()
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // Close the mobile menu whenever the page changes
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setMenuOpen(false)
  }

  function search(event) {
    event.preventDefault()
    const q = query.trim()
    navigate(q ? `/courses?q=${encodeURIComponent(q)}` : '/courses')
    setQuery('')
  }

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <Link to="/" className="brand" aria-label="CodeVidya home">
          <span className="brand__mark" aria-hidden="true">
            &lt;/&gt;
          </span>
          <span className="brand__name">
            Code<span>Vidya</span>
          </span>
        </Link>

        <nav className={`navbar__links ${menuOpen ? 'is-open' : ''}`} aria-label="Main">
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className="navbar__link">
              <Icon name={link.icon} size={16} />
              {link.label}
            </NavLink>
          ))}
        </nav>

        <form className="navbar__search" onSubmit={search} role="search">
          <Icon name="search" size={16} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills…"
            aria-label="Search courses"
          />
        </form>

        <div className="navbar__tools">
          <Link to="/dashboard" className="xp-pill" title="Your XP and learning streak">
            <Icon name="zap" size={14} /> {stats.xp} XP
            {stats.streak > 0 && (
              <>
                <span className="xp-pill__sep" />
                <Icon name="flame" size={14} /> {stats.streak}
              </>
            )}
          </Link>
          <button
            type="button"
            className="icon-button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
          </button>
          <button
            type="button"
            className="icon-button navbar__menu"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <Icon name={menuOpen ? 'x' : 'menu'} />
          </button>
        </div>
      </div>
    </header>
  )
}
