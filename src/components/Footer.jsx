import { Link } from 'react-router-dom'
import { categories } from '../data/courses/index.js'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <Link to="/" className="brand">
            <span className="brand__mark" aria-hidden="true">
              &lt;/&gt;
            </span>
            <span className="brand__name">
              Code<span>Vidya</span>
            </span>
          </Link>
          <p className="muted footer__about">
            Free, hands-on programming classes with runnable examples, readable docs and downloadable notes for every skill.
          </p>
        </div>
        <div>
          <h3>Explore</h3>
          <ul>
            {categories.slice(0, 4).map((c) => (
              <li key={c.id}>
                <Link to={`/courses?cat=${c.id}`}>{c.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>More skills</h3>
          <ul>
            {categories.slice(4).map((c) => (
              <li key={c.id}>
                <Link to={`/courses?cat=${c.id}`}>{c.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Learn</h3>
          <ul>
            <li><Link to="/paths">Career paths</Link></li>
            <li><Link to="/docs">Docs & notes</Link></li>
            <li><Link to="/playground">Code playground</Link></li>
            <li><Link to="/dashboard">My learning</Link></li>
          </ul>
        </div>
      </div>
      <div className="container footer__bottom muted">
        <span>© {YEAR} CodeVidya · Progress is saved in this browser.</span>
        <span>Skill logos: Devicon (MIT)</span>
      </div>
    </footer>
  )
}
