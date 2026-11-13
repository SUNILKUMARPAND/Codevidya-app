import { useState } from 'react'
import CodeRunner from '../components/CodeRunner.jsx'
import useDocumentTitle from '../hooks/useDocumentTitle.js'

const TEMPLATES = {
  javascript: {
    label: 'JavaScript',
    code: `// Write any JavaScript and press Run (or Ctrl + Enter)
const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js']

skills.forEach((skill, i) => console.log(i + 1 + '.', skill))

const fizzBuzz = (n) =>
  Array.from({ length: n }, (_, i) => {
    const x = i + 1
    return x % 15 === 0 ? 'FizzBuzz' : x % 3 === 0 ? 'Fizz' : x % 5 === 0 ? 'Buzz' : x
  })

console.log(fizzBuzz(15).join(', '))
console.log({ learner: 'you', streak: 7, nextGoal: 'Build a project' })`,
  },
  html: {
    label: 'HTML / CSS / JS',
    code: `<!doctype html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; display: grid; place-items: center; min-height: 90vh;
           background: linear-gradient(135deg, #4f46e5, #06b6d4); color: white; margin: 0; }
    .card { background: rgba(255,255,255,.15); padding: 32px 40px; border-radius: 20px; text-align: center; }
    button { font-size: 18px; padding: 10px 22px; border: 0; border-radius: 999px; cursor: pointer; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Hello, CodeVidya!</h1>
    <p>You clicked <strong id="count">0</strong> times</p>
    <button id="btn">Click me</button>
  </div>
  <script>
    let count = 0
    document.getElementById('btn').addEventListener('click', () => {
      document.getElementById('count').textContent = ++count
    })
  </script>
</body>
</html>`,
  },
  python: {
    label: 'Python',
    code: `# Python runs in your browser via WebAssembly (Pyodide)
import math
from collections import Counter

words = "to code or not to code that is the question".split()
print(Counter(words).most_common(3))

squares = [n ** 2 for n in range(1, 11)]
print("Squares:", squares)
print("Sum:", sum(squares), "| sqrt of sum:", round(math.sqrt(sum(squares)), 2))

class Learner:
    def __init__(self, name):
        self.name, self.xp = name, 0
    def study(self, minutes):
        self.xp += minutes // 5
        return self

me = Learner("You").study(45).study(30)
print(f"{me.name} has {me.xp} XP")`,
  },
}

export default function Playground() {
  useDocumentTitle('Code playground')
  const [lang, setLang] = useState('javascript')

  return (
    <div className="container page">
      <header className="page-header page-header--row">
        <div>
          <h1>Code playground</h1>
          <p className="muted">Experiment freely. Code runs in a secure sandbox inside your browser; nothing is sent to a server.</p>
        </div>
        <div className="segmented" role="tablist" aria-label="Language">
          {Object.entries(TEMPLATES).map(([key, t]) => (
            <button key={key} type="button" role="tab" aria-selected={lang === key} className={lang === key ? 'is-active' : ''} onClick={() => setLang(key)}>
              {t.label}
            </button>
          ))}
        </div>
      </header>
      <CodeRunner key={lang} initialCode={TEMPLATES[lang].code} lang={lang} tall />
    </div>
  )
}
