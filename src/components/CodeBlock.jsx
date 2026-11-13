import { useState } from 'react'
import { useLearning } from '../context/learningContext.js'
import { downloadText } from '../utils/notes.js'
import Highlighted from './Highlighted.jsx'
import Icon from './Icon.jsx'

const LANG_LABELS = {
  html: 'HTML', javascript: 'JavaScript', typescript: 'TypeScript', jsx: 'React JSX', python: 'Python', java: 'Java',
  c: 'C', cpp: 'C++', csharp: 'C#', go: 'Go', rust: 'Rust', kotlin: 'Kotlin', swift: 'Swift', dart: 'Dart', php: 'PHP',
  ruby: 'Ruby', sql: 'SQL', bash: 'Terminal', yaml: 'YAML', dockerfile: 'Dockerfile', text: 'Diagram',
}

// Read-only, highlighted code with copy and download buttons
export default function CodeBlock({ code, lang, filename }) {
  const { showToast } = useLearning()
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      showToast('Copy failed: your browser blocked clipboard access')
    }
  }

  return (
    <figure className="code-block">
      <figcaption className="code-block__bar">
        <span className="code-block__lang">{filename ?? LANG_LABELS[lang] ?? lang}</span>
        <span className="code-block__actions">
          <button type="button" className="icon-button icon-button--small" onClick={copy} aria-label="Copy code">
            <Icon name={copied ? 'check' : 'copy'} size={15} />
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          {filename && (
            <button
              type="button"
              className="icon-button icon-button--small"
              onClick={() => downloadText(filename, code, 'text/plain')}
              aria-label={`Download ${filename}`}
            >
              <Icon name="download" size={15} />
              <span>Save</span>
            </button>
          )}
        </span>
      </figcaption>
      <pre className="code">
        <code>
          <Highlighted code={code} lang={lang} />
        </code>
      </pre>
    </figure>
  )
}
