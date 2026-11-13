import { useEffect } from 'react'

// Set the browser tab title for the current page
export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · CodeVidya` : 'ReelFlix'
  }, [title])
}
