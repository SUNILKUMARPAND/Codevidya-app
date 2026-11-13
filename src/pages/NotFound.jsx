import { Link } from 'react-router-dom'
import { EmptyState } from '../components/ui.jsx'
import useDocumentTitle from '../hooks/useDocumentTitle.js'

export default function NotFound() {
  useDocumentTitle('Page not found')
  return (
    <div className="container page">
      <EmptyState
        icon="help"
        title="404: page not found"
        action={
          <Link to="/courses" className="button button--primary">
            Browse all courses
          </Link>
        }
      >
        That page, course or class doesn’t exist. It may have been moved, or the link has a typo.
      </EmptyState>
    </div>
  )
}
