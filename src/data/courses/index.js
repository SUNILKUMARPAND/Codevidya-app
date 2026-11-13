import reference from '../reference.js'
import backend from './backend.js'
import data from './data.js'
import devops from './devops.js'
import languages from './languages.js'
import web from './web.js'

export const categories = [
  { id: 'web', label: 'Web Development', blurb: 'HTML, CSS, JavaScript and modern frameworks' },
  { id: 'languages', label: 'Programming Languages', blurb: 'Python, Java, C, C++, Go, Rust and more' },
  { id: 'backend', label: 'Backend & APIs', blurb: 'Servers, REST APIs and frameworks' },
  { id: 'databases', label: 'Databases', blurb: 'SQL and NoSQL data storage' },
  { id: 'mobile', label: 'Mobile Development', blurb: 'Android, iOS and cross-platform apps' },
  { id: 'data', label: 'Data Science & AI', blurb: 'Analysis, visualisation and machine learning' },
  { id: 'devops', label: 'DevOps & Cloud', blurb: 'Git, Linux, containers and AWS' },
  { id: 'cs', label: 'CS Fundamentals', blurb: 'Algorithms, system design and security' },
]

export const levels = ['Beginner', 'Intermediate', 'Advanced']

// Languages whose lesson code can be executed in the browser
export const RUNNABLE = new Set(['javascript', 'html', 'python'])

// File extension used when a lesson's code is downloaded
export const EXTENSIONS = {
  html: 'html', javascript: 'js', typescript: 'ts', jsx: 'jsx', python: 'py', java: 'java', c: 'c', cpp: 'cpp',
  csharp: 'cs', go: 'go', rust: 'rs', kotlin: 'kt', swift: 'swift', dart: 'dart', php: 'php', ruby: 'rb',
  sql: 'sql', bash: 'sh', yaml: 'yaml', dockerfile: 'Dockerfile', text: 'txt',
}

// Rough reading time: ~200 words per minute plus time to study the code
function estimateMinutes(body, code) {
  return Math.max(4, Math.round(body.split(/\s+/).length / 200 + code.split('\n').length / 6))
}

function build(raw) {
  const lessons = raw.lessons.map(([module, title, body, code], index) => ({
    id: String(index + 1),
    number: index + 1,
    module,
    title,
    body,
    code: code.replace(/^\n+|\s+$/g, ''),
    minutes: estimateMinutes(body, code),
  }))

  // Group consecutive lessons into modules, keeping their order
  const modules = []
  for (const lesson of lessons) {
    const last = modules.at(-1)
    if (last && last.title === lesson.module) last.lessons.push(lesson)
    else modules.push({ title: lesson.module, lessons: [lesson] })
  }

  const quiz = raw.quiz.map(([question, options, answer, explanation], index) => ({
    id: index,
    question,
    options,
    answer,
    explanation,
  }))

  return {
    ...raw,
    lessons,
    modules,
    quiz,
    runnable: RUNNABLE.has(raw.lang),
    minutes: lessons.reduce((sum, lesson) => sum + lesson.minutes, 0),
    reference: reference[raw.id] ?? { cheatsheet: [], terms: [], links: [] },
    categoryLabel: categories.find((c) => c.id === raw.category)?.label ?? raw.category,
  }
}

export const courses = [...web, ...languages, ...backend, ...data, ...devops].map(build)

const byId = new Map(courses.map((course) => [course.id, course]))

export function getCourse(id) {
  return byId.get(id)
}

export function getLesson(course, lessonId) {
  return course?.lessons.find((lesson) => lesson.id === lessonId)
}

// Hand-picked "popular" order for the home page
export const featuredIds = ['python', 'javascript', 'react', 'java', 'dsa', 'sql', 'nodejs', 'ml']
