// Web development courses.
// Lesson rows: [module, title, explanation, code]   Quiz rows: [question, options, answerIndex, why]
// Code is a template literal, so backticks, ${ and backslashes inside it are escaped.

export default [
  {
    id: 'html',
    title: 'HTML5 Fundamentals',
    category: 'web',
    level: 'Beginner',
    icon: 'HTML',
    color: '#e34f26',
    lang: 'html',
    hours: 6,
    tagline: 'Structure every web page with semantic, accessible markup.',
    description:
      'HTML is the skeleton of the web. You will learn how elements, attributes and nesting work, how to build forms, tables and media, and why semantic tags make your pages easier for search engines and screen readers to understand.',
    outcomes: ['Write valid HTML5 documents from scratch', 'Choose the right semantic element', 'Build accessible forms', 'Embed images, audio and video'],
    lessons: [
      ['Getting started', 'Your first web page', 'Every HTML document starts with a `<!doctype html>` declaration, then an `<html>` root holding a `<head>` (metadata) and a `<body>` (what you see). Tags usually come in pairs: an opening `<p>` and a closing `</p>`.', `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My first page</title>
  </head>
  <body>
    <h1>Hello, world!</h1>
    <p>I am learning <strong>HTML</strong>.</p>
  </body>
</html>`],
      ['Getting started', 'Links, images and lists', 'The `<a>` tag makes links using the `href` attribute. Images use the self-closing `<img>` with a `src` and an `alt` text that describes the image for people who cannot see it. Use `<ul>` for bullet lists and `<ol>` for numbered ones.', `<h2>My favourite languages</h2>
<ol>
  <li>JavaScript</li>
  <li>Python</li>
  <li>Rust</li>
</ol>
<p>Read the docs on <a href="https://developer.mozilla.org" target="_blank">MDN</a>.</p>
<img src="https://placehold.co/240x120?text=Logo" alt="Placeholder logo" />`],
      ['Semantic HTML', 'Page structure with semantic tags', 'Instead of wrapping everything in `<div>`, use tags that describe meaning: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>` and `<footer>`. Browsers, search engines and assistive technology all benefit.', `<header>
  <h1>Dev Blog</h1>
  <nav><a href="#">Home</a> | <a href="#">Posts</a></nav>
</header>
<main>
  <article>
    <h2>Why semantic HTML matters</h2>
    <p>Screen readers can jump between landmarks.</p>
  </article>
</main>
<footer>&copy; 2026 Dev Blog</footer>`],
      ['Semantic HTML', 'Tables for tabular data', 'Tables are for data with rows and columns, never for layout. Use `<thead>`, `<tbody>`, `<th>` for headings and `<td>` for cells. A `<caption>` gives the table an accessible title.', `<table border="1" cellpadding="6">
  <caption>Course progress</caption>
  <thead>
    <tr><th>Course</th><th>Lessons</th><th>Done</th></tr>
  </thead>
  <tbody>
    <tr><td>HTML</td><td>5</td><td>3</td></tr>
    <tr><td>CSS</td><td>5</td><td>1</td></tr>
  </tbody>
</table>`],
      ['Forms', 'Building accessible forms', 'Forms collect input. Pair every input with a `<label>` (linked by `for` and `id`) so clicking the label focuses the field. Built-in validation attributes like `required`, `type="email"` and `minlength` give you checks for free.', `<form>
  <label for="email">Email</label>
  <input id="email" type="email" required placeholder="you@example.com" />

  <label for="level">Your level</label>
  <select id="level">
    <option>Beginner</option>
    <option>Intermediate</option>
  </select>

  <button type="submit">Sign up</button>
</form>`],
    ],
    quiz: [
      ['Which tag holds the content visible on the page?', ['<head>', '<body>', '<meta>', '<html>'], 1, 'The <head> holds metadata; everything rendered goes in <body>.'],
      ['What is the alt attribute on <img> for?', ['Image size', 'A tooltip only', 'Describing the image for people who cannot see it', 'Lazy loading'], 2, 'Screen readers read the alt text aloud, and it shows if the image fails to load.'],
      ['Which element is best for site navigation links?', ['<div>', '<nav>', '<section>', '<span>'], 1, '<nav> is the semantic landmark for major navigation blocks.'],
      ['How do you link a <label> to an input?', ['label name = input name', 'label for = input id', 'Put them in the same div', 'label href = input id'], 1, 'The label\'s for attribute must match the input\'s id.'],
    ],
  },
  {
    id: 'css',
    title: 'CSS3 & Modern Layouts',
    category: 'web',
    level: 'Beginner',
    icon: 'CSS',
    color: '#1572b6',
    lang: 'html',
    hours: 8,
    tagline: 'Style beautiful, responsive pages with Flexbox and Grid.',
    description:
      'CSS controls how HTML looks. Learn selectors, the box model, colours and typography, then master modern layout with Flexbox and CSS Grid, and make every page adapt to phones with media queries.',
    outcomes: ['Target elements with selectors', 'Understand the box model', 'Lay out pages with Flexbox and Grid', 'Build responsive designs'],
    lessons: [
      ['Basics', 'Selectors and properties', 'A CSS rule has a selector (what to style) and declarations (how). Select by tag (`p`), class (`.card`) or id (`#title`). Classes are reusable and are what you will use most.', `<style>
  p { color: #444; }
  .highlight { background: gold; padding: 2px 6px; }
  #title { font-family: Georgia, serif; color: crimson; }
</style>

<h1 id="title">Styled heading</h1>
<p>Normal paragraph with a <span class="highlight">highlighted</span> word.</p>`],
      ['Basics', 'The box model', 'Every element is a box: content, then `padding`, then `border`, then `margin`. Setting `box-sizing: border-box` makes `width` include padding and border, which is far easier to reason about.', `<style>
  * { box-sizing: border-box; }
  .box {
    width: 220px;
    padding: 20px;
    border: 4px solid #1572b6;
    margin: 16px;
    background: #e8f1fb;
  }
</style>

<div class="box">220px wide, padding included</div>
<div class="box">Margin pushes boxes apart</div>`],
      ['Layout', 'Flexbox', 'Flexbox lays items out in one direction. Put `display: flex` on the parent, then use `justify-content` (main axis), `align-items` (cross axis) and `gap` for spacing. Perfect for navbars and centring.', `<style>
  .row { display: flex; gap: 12px; justify-content: space-between; align-items: center;
         padding: 12px; background: #222; }
  .row a { color: white; font-family: sans-serif; }
  .logo { font-weight: bold; color: #38bdf8 !important; }
</style>

<nav class="row">
  <a class="logo" href="#">CodeVidya</a>
  <div style="display:flex; gap:16px">
    <a href="#">Courses</a><a href="#">Paths</a><a href="#">Login</a>
  </div>
</nav>`],
      ['Layout', 'CSS Grid', 'Grid handles two dimensions at once. `grid-template-columns` defines the columns; `repeat(auto-fill, minmax(140px, 1fr))` creates as many columns as fit, which gives you a responsive card grid in one line.', `<style>
  .grid { display: grid; gap: 12px;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); }
  .card { background: #fde68a; padding: 24px; border-radius: 10px;
          font-family: sans-serif; text-align: center; }
</style>

<div class="grid">
  <div class="card">HTML</div><div class="card">CSS</div>
  <div class="card">JS</div><div class="card">React</div>
  <div class="card">Node</div><div class="card">SQL</div>
</div>`],
      ['Responsive design', 'Media queries', 'Media queries apply styles only when a condition is true, usually a screen width. Write the mobile styles first, then add `@media (min-width: ...)` blocks for larger screens. Resize the preview to see it switch.', `<style>
  .panel { padding: 20px; font-family: sans-serif; color: white; background: #7c3aed; }
  .panel::after { content: " (narrow screen)"; }

  @media (min-width: 500px) {
    .panel { background: #059669; font-size: 22px; }
    .panel::after { content: " (wide screen)"; }
  }
</style>

<div class="panel">Resize me</div>`],
    ],
    quiz: [
      ['Which selector targets elements with class="card"?', ['#card', 'card', '.card', '*card'], 2, 'A dot selects by class, a hash selects by id.'],
      ['With box-sizing: border-box, width includes…', ['Only content', 'Content + padding + border', 'Content + margin', 'Everything including margin'], 1, 'Margin is always outside the box\'s width.'],
      ['Which property aligns flex items along the main axis?', ['align-items', 'justify-content', 'flex-wrap', 'place-self'], 1, 'justify-content works on the main axis, align-items on the cross axis.'],
      ['Which approach is "mobile-first"?', ['max-width media queries only', 'Base styles for phones, min-width queries for larger screens', 'Separate mobile site', 'Fixed pixel widths'], 1, 'You start small and progressively enhance for wider screens.'],
    ],
  },
  {
    id: 'javascript',
    title: 'JavaScript Essentials',
    category: 'web',
    level: 'Beginner',
    icon: 'JS',
    color: '#f7df1e',
    lang: 'javascript',
    hours: 12,
    tagline: 'The language of the web, from variables to async code.',
    description:
      'JavaScript makes web pages interactive and also runs servers via Node.js. This course covers variables and types, functions, arrays and objects, the DOM, and asynchronous code with promises and async/await. Every example runs right here in your browser.',
    outcomes: ['Use let, const and core data types', 'Write functions and arrow functions', 'Transform data with map, filter and reduce', 'Handle async code with async/await'],
    lessons: [
      ['Foundations', 'Variables and data types', 'Use `const` for values that never get reassigned and `let` for those that do. Avoid the old `var`. JavaScript has strings, numbers, booleans, `null`, `undefined`, objects and arrays; `typeof` tells you a value\'s type.', `const name = 'Asha'
let score = 10
score = score + 5

console.log(name, 'scored', score)
console.log(typeof name, typeof score, typeof true)

const isPassed = score >= 12
console.log('Passed?', isPassed)`],
      ['Foundations', 'Functions and arrow functions', 'Functions package reusable logic. Arrow functions (`=>`) are a shorter syntax and are great for small callbacks. Parameters can have default values.', `function greet(person, greeting = 'Hello') {
  return greeting + ', ' + person + '!'
}

const square = (n) => n * n

console.log(greet('Ravi'))
console.log(greet('Meera', 'Namaste'))
console.log([1, 2, 3, 4].map(square))`],
      ['Working with data', 'Arrays: map, filter, reduce', 'Array methods let you transform data without manual loops. `map` changes each item, `filter` keeps the items that pass a test, and `reduce` combines everything into one value.', `const courses = [
  { title: 'HTML', hours: 6, done: true },
  { title: 'CSS', hours: 8, done: true },
  { title: 'React', hours: 14, done: false },
]

const titles = courses.map((c) => c.title)
const finished = courses.filter((c) => c.done)
const totalHours = courses.reduce((sum, c) => sum + c.hours, 0)

console.log(titles)
console.log('Finished:', finished.length)
console.log('Total hours:', totalHours)`],
      ['Working with data', 'Objects and destructuring', 'Objects group related values under keys. Destructuring pulls values out into variables in one line, and the spread operator `...` copies or merges objects and arrays.', `const user = { name: 'Kiran', city: 'Pune', skills: ['JS', 'CSS'] }

const { name, city } = user
console.log(name, 'lives in', city)

const updated = { ...user, city: 'Bengaluru', skills: [...user.skills, 'React'] }
console.log(updated)
console.log('Original unchanged:', user.city)`],
      ['Async JavaScript', 'Promises and async/await', 'Some work takes time, like network requests. A Promise represents a future value. Inside an `async` function, `await` pauses until the promise settles, so async code reads like normal code. Wrap it in `try/catch` to handle errors.', `const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function loadCourse(id) {
  console.log('Loading course', id, '...')
  await wait(500)
  if (id < 0) throw new Error('Invalid id')
  return { id, title: 'JavaScript Essentials' }
}

async function main() {
  try {
    const course = await loadCourse(7)
    console.log('Loaded:', course.title)
    await loadCourse(-1)
  } catch (err) {
    console.log('Caught error:', err.message)
  }
}

main()`],
    ],
    quiz: [
      ['Which keyword declares a variable that cannot be reassigned?', ['var', 'let', 'const', 'static'], 2, 'const bindings cannot be reassigned (though objects they point to can still change).'],
      ['What does [1, 2, 3].map(n => n * 2) return?', ['[1, 2, 3]', '[2, 4, 6]', '12', 'undefined'], 1, 'map returns a new array with each item transformed.'],
      ['Which method keeps only items that pass a test?', ['map', 'reduce', 'filter', 'forEach'], 2, 'filter returns a new array of matching items.'],
      ['What does await do inside an async function?', ['Blocks the whole browser', 'Pauses that function until the promise settles', 'Converts a value to a string', 'Runs code in parallel threads'], 1, 'Only the async function pauses; the rest of the page keeps running.'],
    ],
  },
  {
    id: 'typescript',
    title: 'TypeScript in Practice',
    category: 'web',
    level: 'Intermediate',
    icon: 'TS',
    color: '#3178c6',
    lang: 'typescript',
    hours: 8,
    tagline: 'Add static types to JavaScript and catch bugs before they run.',
    description:
      'TypeScript is JavaScript with types. Learn type annotations, interfaces, union types, generics and how the compiler catches mistakes while you type, making large codebases far easier to maintain.',
    outcomes: ['Annotate variables and functions', 'Model data with interfaces and types', 'Use unions and narrowing', 'Write reusable generic functions'],
    lessons: [
      ['Type basics', 'Type annotations', 'Add a type after a colon. TypeScript infers most types for you, so annotate function parameters and public APIs and let inference handle the rest. Type errors show up in your editor before the code ever runs.', `let username: string = 'Asha'
let age = 24            // inferred as number
const active: boolean = true

function add(a: number, b: number): number {
  return a + b
}

add(2, 3)      // OK
// add('2', 3) // Error: string is not assignable to number`],
      ['Type basics', 'Interfaces and type aliases', 'An `interface` describes the shape of an object. Mark optional properties with `?` and read-only ones with `readonly`. A `type` alias can do the same and can also name unions and other types.', `interface Course {
  readonly id: string
  title: string
  hours: number
  tags?: string[]
}

type Level = 'Beginner' | 'Intermediate' | 'Advanced'

const ts: Course = { id: 'ts', title: 'TypeScript', hours: 8 }
// ts.id = 'x'  // Error: id is read-only`],
      ['Advanced types', 'Union types and narrowing', 'A union `A | B` means a value can be either type. Before using type-specific features you narrow it with checks like `typeof`, `in`, or a shared discriminant field.', `type Result =
  | { status: 'ok'; data: string[] }
  | { status: 'error'; message: string }

function show(result: Result) {
  if (result.status === 'ok') {
    console.log(result.data.join(', '))  // data exists here
  } else {
    console.error(result.message)        // message exists here
  }
}`],
      ['Advanced types', 'Generics', 'Generics let one function or type work with many types while keeping type safety. `<T>` is a placeholder filled in when the function is called.', `function first<T>(items: T[]): T | undefined {
  return items[0]
}

const n = first([10, 20, 30])        // number | undefined
const s = first(['a', 'b'])          // string | undefined

interface ApiResponse<T> {
  data: T
  error?: string
}
const res: ApiResponse<{ name: string }> = { data: { name: 'Ravi' } }`],
      ['Tooling', 'Utility types and tsconfig', 'Built-in utility types transform other types: `Partial<T>` makes everything optional, `Pick<T, K>` and `Omit<T, K>` select fields, `Record<K, V>` builds maps. Turn on `"strict": true` in `tsconfig.json` for the best safety.', `interface User { id: number; name: string; email: string }

type UserUpdate = Partial<User>
type PublicUser = Omit<User, 'email'>
type ScoreBoard = Record<string, number>

const patch: UserUpdate = { name: 'New name' }
const scores: ScoreBoard = { asha: 92, ravi: 88 }

// tsconfig.json
// { "compilerOptions": { "strict": true, "target": "ES2022" } }`],
    ],
    quiz: [
      ['When are TypeScript type errors reported?', ['Only in production', 'At compile time / in the editor', 'Never', 'Only when the code throws'], 1, 'Types are checked before the code runs and are erased from the output JavaScript.'],
      ['What does the ? in `tags?: string[]` mean?', ['Nullable string', 'Optional property', 'Private property', 'Array of unknowns'], 1, 'The property may be missing from the object.'],
      ['What does Partial<User> produce?', ['User with all properties required', 'User with all properties optional', 'Only the id field', 'An array of users'], 1, 'Partial marks every property as optional.'],
      ['Generics are mainly used to…', ['Speed up code', 'Write reusable code that keeps type information', 'Disable type checking', 'Create classes'], 1, 'A generic adapts to the type it is called with.'],
    ],
  },
  {
    id: 'react',
    title: 'React.js: Build Modern UIs',
    category: 'web',
    level: 'Intermediate',
    icon: 'Re',
    color: '#61dafb',
    lang: 'jsx',
    hours: 14,
    tagline: 'Components, state, hooks and effects: the most popular UI library.',
    description:
      'React lets you build interfaces from small reusable components. Learn JSX, props, state with useState, side effects with useEffect, rendering lists, forms, and how to share state with context. This very site is built with React!',
    outcomes: ['Build UIs from reusable components', 'Manage state with hooks', 'Fetch data with effects', 'Share state with context'],
    lessons: [
      ['Core concepts', 'Components and JSX', 'A component is a function that returns JSX, an HTML-like syntax that compiles to JavaScript. Component names start with a capital letter. Use `{}` to drop any JavaScript expression into the markup.', `function Welcome() {
  const name = 'Asha'
  return (
    <div className="card">
      <h1>Hello, {name}!</h1>
      <p>You have {3 + 2} new lessons.</p>
    </div>
  )
}

export default Welcome`],
      ['Core concepts', 'Props', 'Props pass data from parent to child, like function arguments. They are read-only: a component should never change its own props. Destructure them in the parameter list.', `function CourseCard({ title, hours, level = 'Beginner' }) {
  return (
    <article className="course-card">
      <h3>{title}</h3>
      <p>{hours} hours · {level}</p>
    </article>
  )
}

function App() {
  return (
    <>
      <CourseCard title="HTML5" hours={6} />
      <CourseCard title="React" hours={14} level="Intermediate" />
    </>
  )
}`],
      ['Hooks', 'State with useState', '`useState` gives a component memory. It returns the current value and a setter; calling the setter re-renders the component. When the next value depends on the previous one, pass an updater function.', `import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Clicked {count} times</p>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}`],
      ['Hooks', 'Effects and data fetching', '`useEffect` runs code after render, for things outside React like network requests, timers or subscriptions. The dependency array controls when it re-runs, and the returned function cleans up.', `import { useEffect, useState } from 'react'

function UserList() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const controller = new AbortController()
    fetch('https://jsonplaceholder.typicode.com/users', { signal: controller.signal })
      .then((res) => res.json())
      .then(setUsers)
      .catch(() => {})
    return () => controller.abort()   // cleanup on unmount
  }, [])                              // [] = run once

  return <ul>{users.map((u) => <li key={u.id}>{u.name}</li>)}</ul>
}`],
      ['Patterns', 'Lists, keys and controlled forms', 'Render lists with `map` and give each item a stable `key` so React can track it. In a controlled form, React state is the single source of truth: the input shows `value` and updates it in `onChange`.', `import { useState } from 'react'

function TodoApp() {
  const [text, setText] = useState('')
  const [todos, setTodos] = useState([])

  function handleSubmit(e) {
    e.preventDefault()
    if (!text.trim()) return
    setTodos([...todos, { id: Date.now(), text }])
    setText('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button>Add</button>
      <ul>{todos.map((t) => <li key={t.id}>{t.text}</li>)}</ul>
    </form>
  )
}`],
    ],
    quiz: [
      ['What must a React component name start with?', ['A lowercase letter', 'A capital letter', 'use', 'An underscore'], 1, 'Lowercase tags are treated as built-in HTML elements.'],
      ['Can a component modify its own props?', ['Yes, always', 'Only in class components', 'No, props are read-only', 'Only with useState'], 2, 'Props flow down; use state for values that change.'],
      ['What does an empty dependency array [] in useEffect mean?', ['Run on every render', 'Run once after the first render', 'Never run', 'Run before render'], 1, 'With no dependencies it never needs to re-run.'],
      ['Why do list items need a key prop?', ['For CSS styling', 'So React can track items between renders', 'To sort the list', 'It is optional decoration'], 1, 'Stable keys let React update, move and remove the right items.'],
    ],
  },
  {
    id: 'nextjs',
    title: 'Next.js Full-Stack React',
    category: 'web',
    level: 'Advanced',
    icon: 'N',
    color: '#111111',
    lang: 'jsx',
    hours: 10,
    tagline: 'Server components, file-based routing and API routes.',
    description:
      'Next.js is the production framework for React. Learn the App Router, server and client components, data fetching on the server, dynamic routes, route handlers for APIs, and how to deploy.',
    outcomes: ['Structure apps with the App Router', 'Know when to use server vs client components', 'Fetch data on the server', 'Build API route handlers'],
    lessons: [
      ['Routing', 'File-based routing', 'In the App Router, folders inside `app/` become URL segments and a `page.jsx` file makes the route public. `layout.jsx` wraps child pages and keeps shared UI like navbars mounted between navigations.', `// app/layout.jsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body><nav>CodeVidya</nav>{children}</body>
    </html>
  )
}

// app/courses/page.jsx  ->  /courses
export default function CoursesPage() {
  return <h1>All courses</h1>
}`],
      ['Routing', 'Dynamic routes', 'Square brackets create a dynamic segment: `app/courses/[id]/page.jsx` matches `/courses/react`, `/courses/python` and so on. The value arrives in `params`.', `// app/courses/[id]/page.jsx
export default async function CoursePage({ params }) {
  const { id } = await params
  return <h1>Course: {id}</h1>
}

// Pre-render known pages at build time
export function generateStaticParams() {
  return [{ id: 'react' }, { id: 'python' }]
}`],
      ['Rendering', 'Server and client components', 'Components are server components by default: they render on the server, can read databases directly and send no JavaScript to the browser. Add `\'use client\'` at the top of a file when you need state, effects or event handlers.', `// app/components/LikeButton.jsx
'use client'
import { useState } from 'react'

export default function LikeButton() {
  const [likes, setLikes] = useState(0)
  return <button onClick={() => setLikes(likes + 1)}>Likes {likes}</button>
}

// app/page.jsx (server component)
import LikeButton from './components/LikeButton'
export default function Home() {
  return <main><h1>Home</h1><LikeButton /></main>
}`],
      ['Data', 'Fetching data on the server', 'Server components can be `async` and `await` data directly. Next.js extends `fetch` with caching options: `revalidate` regenerates the page every N seconds, giving you fast static pages that stay fresh.', `// app/posts/page.jsx
export default async function PostsPage() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    next: { revalidate: 60 },   // refresh at most once a minute
  })
  const posts = await res.json()

  return (
    <ul>
      {posts.slice(0, 5).map((p) => <li key={p.id}>{p.title}</li>)}
    </ul>
  )
}`],
      ['Data', 'Route handlers (APIs)', 'A `route.js` file inside `app/` creates an API endpoint. Export functions named after HTTP methods. They receive a standard `Request` and return a `Response`, so your frontend and backend live in one project.', `// app/api/courses/route.js  ->  GET/POST /api/courses
const courses = [{ id: 'react', title: 'React' }]

export async function GET() {
  return Response.json(courses)
}

export async function POST(request) {
  const body = await request.json()
  courses.push(body)
  return Response.json(body, { status: 201 })
}`],
    ],
    quiz: [
      ['Which file makes a folder a public route in the App Router?', ['index.jsx', 'route.jsx', 'page.jsx', 'layout.jsx'], 2, 'page.jsx defines the UI for that URL segment.'],
      ['Components in the app directory are by default…', ['Client components', 'Server components', 'Static HTML only', 'Web workers'], 1, 'Add \'use client\' to opt a file into client rendering.'],
      ['What does app/blog/[slug]/page.jsx match?', ['Only /blog/[slug]', '/blog/anything', '/blog only', 'Every route'], 1, 'Brackets mark a dynamic segment.'],
      ['How do you create a GET API endpoint?', ['export function GET in route.js', 'app.get() in page.jsx', 'A getServerSideProps function', 'A .api file'], 0, 'Route handlers export functions named after HTTP methods.'],
    ],
  },
  {
    id: 'vue',
    title: 'Vue.js 3 Essentials',
    category: 'web',
    level: 'Intermediate',
    icon: 'Vue',
    color: '#42b883',
    lang: 'html',
    hours: 9,
    tagline: 'The approachable, progressive JavaScript framework.',
    description:
      'Vue makes reactive UIs simple. Learn templates and directives, reactive state with ref and computed, components with props and events, and the Composition API. The examples load Vue from a CDN and run live here.',
    outcomes: ['Write Vue templates and directives', 'Create reactive state with ref and computed', 'Build components with props and emits', 'Use the Composition API'],
    lessons: [
      ['Basics', 'Your first Vue app', 'Create an app with `createApp`, return reactive data from `setup`, and mount it on an element. Double curly braces `{{ }}` display values, and the page updates automatically when data changes.', `<div id="app">
  <h1>{{ message }}</h1>
  <button @click="count++">Clicked {{ count }} times</button>
</div>

<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
<script>
  const { createApp, ref } = Vue
  createApp({
    setup() {
      return { message: ref('Hello Vue!'), count: ref(0) }
    },
  }).mount('#app')
</script>`],
      ['Basics', 'Directives: v-if, v-for, v-model', 'Directives are special attributes. `v-if` renders conditionally, `v-for` loops over lists (with a `:key`), and `v-model` creates two-way binding between an input and state.', `<div id="app">
  <input v-model="newSkill" @keyup.enter="add" placeholder="Add a skill" />
  <p v-if="skills.length === 0">No skills yet.</p>
  <ul>
    <li v-for="s in skills" :key="s">{{ s }}</li>
  </ul>
</div>

<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
<script>
  const { createApp, ref } = Vue
  createApp({
    setup() {
      const skills = ref(['HTML', 'CSS'])
      const newSkill = ref('')
      const add = () => { if (newSkill.value) skills.value.push(newSkill.value); newSkill.value = '' }
      return { skills, newSkill, add }
    },
  }).mount('#app')
</script>`],
      ['Reactivity', 'Computed properties', 'A `computed` value derives from other state and is cached until its inputs change. Use it instead of repeating logic in the template.', `<div id="app">
  <input v-model="query" placeholder="Filter courses" />
  <p>{{ filtered.length }} of {{ courses.length }} courses</p>
  <ul><li v-for="c in filtered" :key="c">{{ c }}</li></ul>
</div>

<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
<script>
  const { createApp, ref, computed } = Vue
  createApp({
    setup() {
      const courses = ['Vue', 'React', 'Angular', 'Svelte', 'Node']
      const query = ref('')
      const filtered = computed(() =>
        courses.filter((c) => c.toLowerCase().includes(query.value.toLowerCase())))
      return { courses, query, filtered }
    },
  }).mount('#app')
</script>`],
      ['Components', 'Components, props and emits', 'Components are reusable pieces. Parents pass data down with props, and children notify parents by emitting events. Here a child button emits `like` and the parent counts.', `<div id="app">
  <like-button v-for="c in courses" :key="c" :title="c" @like="total++"></like-button>
  <p>Total likes: {{ total }}</p>
</div>

<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
<script>
  const { createApp, ref } = Vue
  const app = createApp({ setup: () => ({ courses: ['Vue', 'Nuxt'], total: ref(0) }) })
  app.component('like-button', {
    props: ['title'],
    emits: ['like'],
    template: '<button @click="$emit(\\'like\\')">Like {{ title }}</button> ',
  })
  app.mount('#app')
</script>`],
      ['Components', 'Single-file components', 'Real Vue projects (created with `npm create vue@latest`) use `.vue` files that keep template, script and styles together. `<script setup>` is the concise Composition API syntax.', `<!-- CourseCard.vue -->
<script setup>
import { ref } from 'vue'
const props = defineProps({ title: String, hours: Number })
const saved = ref(false)
</script>

<template>
  <article class="card">
    <h3>{{ props.title }}</h3>
    <p>{{ props.hours }} hours</p>
    <button @click="saved = !saved">{{ saved ? 'Saved' : 'Save' }}</button>
  </article>
</template>

<style scoped>
.card { padding: 1rem; border: 1px solid #ddd; }
</style>`],
    ],
    quiz: [
      ['Which directive creates two-way binding on an input?', ['v-bind', 'v-model', 'v-on', 'v-if'], 1, 'v-model keeps the input and state in sync.'],
      ['What is @click shorthand for?', ['v-bind:click', 'v-on:click', 'v-model:click', 'v-show:click'], 1, '@ is shorthand for v-on, : for v-bind.'],
      ['A computed property is…', ['Recalculated on every render', 'Cached until its dependencies change', 'Only for strings', 'A lifecycle hook'], 1, 'Computed values are memoised.'],
      ['How does a child component notify its parent?', ['Mutating props', 'Emitting an event', 'Global variables', 'v-for'], 1, 'Props down, events up.'],
    ],
  },
  {
    id: 'angular',
    title: 'Angular for Enterprise Apps',
    category: 'web',
    level: 'Advanced',
    icon: 'Ng',
    color: '#dd0031',
    lang: 'typescript',
    hours: 12,
    tagline: 'Google\'s TypeScript framework with batteries included.',
    description:
      'Angular is a full framework with routing, forms, HTTP and dependency injection built in. Learn standalone components, templates and signals, services, routing, and the HttpClient.',
    outcomes: ['Create standalone components', 'Use signals for reactive state', 'Inject services', 'Configure routing and HTTP'],
    lessons: [
      ['Components', 'Standalone components', 'An Angular component is a TypeScript class with a `@Component` decorator that links a selector, a template and styles. Generate one with `ng generate component course-card`.', `import { Component } from '@angular/core'

@Component({
  selector: 'app-hello',
  standalone: true,
  template: \`<h1>Hello {{ name }}!</h1>\`,
  styles: [\`h1 { color: #dd0031; }\`],
})
export class HelloComponent {
  name = 'Angular'
}`],
      ['Components', 'Templates and control flow', 'Templates use `{{ }}` interpolation, `[prop]` property binding, `(event)` event binding, and the built-in control flow blocks `@if` and `@for`.', `@Component({
  selector: 'app-course-list',
  standalone: true,
  template: \`
    @if (courses.length) {
      <ul>
        @for (c of courses; track c.id) {
          <li [class.done]="c.done" (click)="toggle(c)">{{ c.title }}</li>
        }
      </ul>
    } @else {
      <p>No courses</p>
    }\`,
})
export class CourseListComponent {
  courses = [{ id: 1, title: 'Angular', done: false }]
  toggle(c: { done: boolean }) { c.done = !c.done }
}`],
      ['Reactivity', 'Signals', 'Signals are Angular\'s reactive primitive. `signal()` holds a value, `computed()` derives from signals, and templates read them by calling them like functions. Only what depends on a changed signal updates.', `import { Component, computed, signal } from '@angular/core'

@Component({
  selector: 'app-cart',
  standalone: true,
  template: \`
    <p>Qty: {{ qty() }} · Total: ₹{{ total() }}</p>
    <button (click)="qty.update(q => q + 1)">Add</button>\`,
})
export class CartComponent {
  price = 499
  qty = signal(1)
  total = computed(() => this.qty() * this.price)
}`],
      ['Architecture', 'Services and dependency injection', 'Services hold logic and data shared between components. Mark a class `@Injectable({ providedIn: \'root\' })` and ask for it with `inject()`. Angular creates one instance and hands it out.', `import { Injectable, inject, signal } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class ProgressService {
  completed = signal<string[]>([])
  complete(id: string) { this.completed.update(list => [...list, id]) }
}

@Component({ selector: 'app-lesson', standalone: true,
  template: '<button (click)="done()">Mark complete</button>' })
export class LessonComponent {
  private progress = inject(ProgressService)
  done() { this.progress.complete('angular-4') }
}`],
      ['Architecture', 'Routing and HttpClient', 'Define routes as an array of path → component and provide them with `provideRouter`. `HttpClient` makes HTTP calls and returns Observables you can subscribe to or convert to signals.', `// app.routes.ts
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'courses/:id', component: CourseComponent },
  { path: '**', redirectTo: '' },
]

// main.ts
bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient()],
})

// course.service.ts
export class CourseService {
  private http = inject(HttpClient)
  list() { return this.http.get<Course[]>('/api/courses') }
}`],
    ],
    quiz: [
      ['Which decorator defines an Angular component?', ['@Injectable', '@Component', '@NgModule', '@Directive'], 1, '@Component attaches metadata such as selector and template.'],
      ['How do you read a signal named count in a template?', ['count', 'count()', '$count', 'count.value'], 1, 'Signals are read by calling them.'],
      ['What does (click)="save()" do?', ['Property binding', 'Event binding', 'Two-way binding', 'Interpolation'], 1, 'Parentheses bind to events, square brackets to properties.'],
      ['Which function retrieves a service inside a component?', ['require()', 'inject()', 'import()', 'useService()'], 1, 'inject() asks the DI system for an instance.'],
    ],
  },
]
