import { useEffect, useState } from 'react'

// Like useState, but the value is saved to localStorage and restored on reload.
export default function useLocalStorage(key, initialValue) {
  // Passing a function to useState means localStorage is only read once, on
  // the first render, not on every render.
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved !== null ? JSON.parse(saved) : initialValue
    } catch {
      return initialValue
    }
  })

  // Whenever the value changes, write it back to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage can be full or blocked (private mode); the app still works in memory
    }
  }, [key, value])

  return [value, setValue]
}
