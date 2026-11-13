import { useEffect, useRef, useState } from 'react'
import CodeEditor from './CodeEditor.jsx'
import Icon from './Icon.jsx'

// Each run gets a fresh id so messages from an older sandbox are ignored
let lastRunId = 0
const nextRunId = () => ++lastRunId

const PYODIDE = 'https://cdn.jsdelivr.net/pyodide/v0.29.5/full/pyodide.js'

// Script injected first into every sandbox: forwards console output and errors
// to this page with postMessage (the iframe has no access to our page otherwise).
const BRIDGE = (runId) => `<script>
(() => {
  const fmt = (v) => {
    if (typeof v === 'string') return v
    if (v instanceof Error) return v.name + ': ' + v.message
    try {
      return JSON.stringify(v, (k, x) => typeof x === 'bigint' ? x + 'n' : x === undefined ? 'undefined' : x, 2) ?? String(v)
    } catch { return String(v) }
  }
  const send = (type, args) => parent.postMessage({ __cv: ${runId}, type, text: Array.from(args).map(fmt).join(' ') }, '*')
  for (const m of ['log', 'info', 'warn', 'error', 'table']) {
    console[m] = (...args) => send(m === 'table' ? 'log' : m, args)
  }
  addEventListener('error', (e) => send('error', [e.message || 'Error']))
  addEventListener('unhandledrejection', (e) => send('error', ['Uncaught (in promise) ' + fmt(e.reason)]))
  window.__send = send
})()
</script>`

// Keep the user's code from closing our <script> tag early
const escapeScript = (code) => code.replace(/<\/script/gi, '<\\/script')

function buildDocument(lang, code, runId) {
  if (lang === 'javascript') {
    return `<!doctype html><html><body>${BRIDGE(runId)}<script>${escapeScript(code)}
</script><script>setTimeout(() => __send('done', []), 0)</script></body></html>`
  }
  if (lang === 'python') {
    // JSON-encode the source and escape "<" so it can sit safely inside a <script>
    const source = JSON.stringify(code).replace(/</g, '\\u003c')
    return `<!doctype html><html><body>${BRIDGE(runId)}<script src="${PYODIDE}"></script><script>
(async () => {
  try {
    __send('status', ['Starting Python…'])
    const py = await loadPyodide({ stdout: (s) => __send('log', [s]), stderr: (s) => __send('error', [s]) })
    __send('status', ['Running…'])
    await py.loadPackagesFromImports(${source})
    await py.runPythonAsync(${source})
  } catch (err) {
    __send('error', [String(err.message || err).trim().split('\\n').slice(-3).join('\\n')])
  }
  __send('done', [])
})()
</script></body></html>`
  }
  // HTML: render the document itself, with console capture added in front
  return BRIDGE(runId) + code
}

// An editable code example with a Run button and an output panel.
// JavaScript prints to a console, HTML renders a live preview, Python runs via Pyodide (WebAssembly).
export default function CodeRunner({ initialCode, lang, autoRun = false, tall = false }) {
  const [code, setCode] = useState(initialCode)
  const [run, setRun] = useState(autoRun ? { id: 1, doc: buildDocument(lang, initialCode, 1) } : null)
  const [output, setOutput] = useState([])
  const [status, setStatus] = useState('')
  const iframeRef = useRef(null)
  const runId = run?.id

  // When the lesson changes, start fresh with the new example
  const [lastInitial, setLastInitial] = useState(initialCode)
  if (initialCode !== lastInitial) {
    setLastInitial(initialCode)
    setCode(initialCode)
    setOutput([])
    setStatus('')
    const id = nextRunId()
    setRun(autoRun ? { id, doc: buildDocument(lang, initialCode, id) } : null)
  }

  useEffect(() => {
    if (!runId) return
    function onMessage(event) {
      const data = event.data
      if (!data || data.__cv !== runId || event.source !== iframeRef.current?.contentWindow) return
      if (data.type === 'status') setStatus(data.text)
      else if (data.type === 'done') setStatus('')
      else setOutput((lines) => [...lines, { type: data.type, text: data.text }].slice(-500))
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [runId])

  function execute() {
    const id = nextRunId()
    setOutput([])
    setStatus(lang === 'python' ? 'Loading Python runtime (first run downloads ~10 MB)…' : lang === 'javascript' ? 'Running…' : '')
    setRun({ id, doc: buildDocument(lang, code, id) })
  }

  function reset() {
    setCode(initialCode)
    setOutput([])
    setStatus('')
    setRun(null)
  }

  const isPreview = lang === 'html'

  return (
    <section className={`runner ${tall ? 'runner--tall' : ''}`} aria-label="Interactive code example">
      <div className="runner__bar">
        <span className="runner__title">
          <Icon name="edit" size={15} /> Try it yourself
          <span className="muted runner__hint">Edit the code, then press Run (Ctrl + Enter)</span>
        </span>
        <span className="runner__actions">
          <button type="button" className="button button--ghost button--small" onClick={reset}>
            <Icon name="reset" size={15} /> Reset
          </button>
          <button type="button" className="button button--primary button--small" onClick={execute}>
            <Icon name="play" size={14} /> Run
          </button>
        </span>
      </div>

      <div className="runner__panes">
        <CodeEditor value={code} onChange={setCode} lang={lang} onRun={execute} minLines={tall ? 18 : 6} />

        <div className="runner__output">
          <div className="runner__output-label">
            <Icon name={isPreview ? 'layers' : 'terminal'} size={14} /> {isPreview ? 'Preview' : 'Console'}
            {status && <span className="runner__status">{status}</span>}
          </div>
          {isPreview && run && (
            <iframe
              key={run.id}
              ref={iframeRef}
              className="runner__preview"
              title="Code preview"
              sandbox="allow-scripts"
              srcDoc={run.doc}
            />
          )}
          {!isPreview && run && (
            <iframe key={run.id} ref={iframeRef} className="visually-hidden" title="Code sandbox" sandbox="allow-scripts" srcDoc={run.doc} />
          )}
          {!isPreview && (
            <pre className="console" role="log" aria-live="polite">
              {output.length === 0 && !status && <span className="console__placeholder">Press Run to see the output here.</span>}
              {output.map((line, i) => (
                <div key={i} className={`console__line console__line--${line.type}`}>
                  {line.text}
                </div>
              ))}
            </pre>
          )}
          {isPreview && !run && (
            <div className="runner__empty">
              <Icon name="play" size={22} />
              <span>Press Run to render the page</span>
            </div>
          )}
          {isPreview && output.some((l) => l.type === 'error') && (
            <pre className="console console--compact">
              {output.filter((l) => l.type === 'error').map((line, i) => (
                <div key={i} className="console__line console__line--error">{line.text}</div>
              ))}
            </pre>
          )}
        </div>
      </div>
    </section>
  )
}
