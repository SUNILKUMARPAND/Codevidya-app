import { useMemo } from 'react'
import { highlight } from '../utils/highlight.js'

// Renders code as coloured <span> tokens (used inside a <pre><code>)
export default function Highlighted({ code, lang }) {
  const tokens = useMemo(() => highlight(code, lang), [code, lang])
  return tokens.map((token, i) =>
    token.type === 'plain' ? (
      token.text
    ) : (
      <span key={i} className={`tok-${token.type}`}>
        {token.text}
      </span>
    ),
  )
}
