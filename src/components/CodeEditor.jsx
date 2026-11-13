import Highlighted from './Highlighted.jsx'

// A lightweight code editor: a transparent <textarea> laid exactly over a
// highlighted <pre>, so you type in a normal text box but see coloured code.
export default function CodeEditor({ value, onChange, lang, onRun, label = 'Code editor', minLines = 8 }) {
  function handleKeyDown(event) {
    const el = event.currentTarget
    if (event.key === 'Tab' && !event.shiftKey) {
      event.preventDefault()
      const { selectionStart: start, selectionEnd: end } = el
      const next = value.slice(0, start) + '  ' + value.slice(end)
      onChange(next)
      // Put the caret after the inserted spaces once React has re-rendered
      requestAnimationFrame(() => el.setSelectionRange(start + 2, start + 2))
    } else if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault()
      onRun?.()
    }
  }

  const lines = Math.max(minLines, value.split('\n').length)

  return (
    <div className="editor">
      <div className="editor__gutter" aria-hidden="true">
        {Array.from({ length: lines }, (_, i) => (
          <span key={i}>{i + 1}</span>
        ))}
      </div>
      <div className="editor__surface">
        <pre className="code editor__layer" aria-hidden="true">
          <code>
            <Highlighted code={value} lang={lang} />
            {'\n'}
          </code>
        </pre>
        <textarea
          className="editor__input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck="false"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          aria-label={label}
          wrap="off"
        />
      </div>
    </div>
  )
}
