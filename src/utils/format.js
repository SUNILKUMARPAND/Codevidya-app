// Local calendar day as YYYY-MM-DD (used for the learning streak)
export function dayKey(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// Consecutive days with activity, ending today (or yesterday, so the streak
// isn't "lost" before you've had a chance to study today)
export function streakFrom(days) {
  const set = new Set(days)
  const cursor = new Date()
  if (!set.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1)
  let streak = 0
  while (set.has(dayKey(cursor))) {
    streak++
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function formatMinutes(minutes) {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m ? `${h} h ${m} min` : `${h} h`
}

export const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`

// Split text on `inline code` so it can be rendered with <code> elements
export function splitInlineCode(text) {
  return text.split(/(`[^`]+`)/g).map((part, i) =>
    part.startsWith('`') && part.endsWith('`') && part.length > 1 ? { code: true, text: part.slice(1, -1), key: i } : { code: false, text: part, key: i },
  )
}

// Stable short id for a certificate (same course + learner -> same id)
export function certificateId(courseId, name, date) {
  let hash = 2166136261
  for (const ch of `${courseId}|${name}|${date}`) hash = Math.imul(hash ^ ch.charCodeAt(0), 16777619)
  return `CV-${courseId.slice(0, 3).toUpperCase()}-${(hash >>> 0).toString(36).toUpperCase().padStart(7, '0')}`
}
