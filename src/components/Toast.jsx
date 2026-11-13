import { useLearning } from '../context/learningContext.js'
import Icon from './Icon.jsx'

export default function Toast() {
  const { toast } = useLearning()
  return (
    <div className={`toast ${toast ? 'is-visible' : ''}`} role="status" aria-live="polite">
      {toast && (
        <>
          <Icon name="check" size={16} /> {toast}
        </>
      )}
    </div>
  )
}
