# CodeVidya: e-learning for programming

A React (Vite) e-learning site covering **35 technical skills** with 175 hands-on classes, 140 quiz questions,
full documentation, downloadable notes, career paths, certificates and a live code playground.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run lint
```

## Skills covered

| Category | Courses |
| --- | --- |
| Web Development | HTML5, CSS3, JavaScript, TypeScript, React, Next.js, Vue, Angular |
| Programming Languages | Python, Java, C, C++, C#, Go, Rust, Ruby |
| Backend & APIs | Node.js & Express, Django, Spring Boot, PHP |
| Databases | SQL (PostgreSQL), MongoDB |
| Mobile | Kotlin, Swift & SwiftUI, Dart & Flutter |
| Data Science & AI | Pandas/NumPy, Machine Learning (scikit-learn) |
| DevOps & Cloud | Git & GitHub, Linux & Bash, Docker, Kubernetes, AWS |
| CS Fundamentals | Data Structures & Algorithms, System Design, Web Security |

## Features

- **Classes**: 5 per course, grouped into modules, each with an explanation and a worked code example.
- **Run code in the browser**: JavaScript, HTML/CSS (and the Vue lessons) run in a sandboxed iframe; Python runs via
  Pyodide (WebAssembly, ~10 MB download on first run). Other languages get highlighted code with Copy and Save-as-file.
- **Docs for every skill** (`/docs/:id`): the full readable guide (overview, setup steps, every class, cheat sheet,
  key terms, practice questions with answers, official links), printable to PDF.
- **Downloadable notes**: any course as Markdown, or all 35 in one file, from the Docs library (`/docs`).
- **Quiz and certificate**: pass mark 75%, explanations shown after you submit; the certificate unlocks when all classes are done
  and the quiz is passed, and is printable.
- **Progress**: enrolments, completed classes, XP, day streak, activity calendar, per-class notes and a wishlist,
  all saved in `localStorage` (`codevidya:*` keys). No backend, no account.
- **Career paths**: Frontend, Backend, Java, Data Science, Mobile, DevOps, Interview prep, Systems.
- Light/dark theme, responsive down to 360px wide, keyboard accessible.

## Skill logos

Real technology logos are loaded live from the [Devicon](https://devicon.dev) CDN (MIT licence); see
`src/data/logos.js`. System Design and Web Security have no official logo and use a coloured badge. If the CDN can't be reached,
every logo falls back to the badge automatically.

## Project structure

```
src/
  data/courses/*.js   course content (lesson + quiz rows), index.js builds the catalogue
  data/reference.js   cheat sheets, key terms, official links per course
  data/setup.js       "run it locally" instructions per course
  data/paths.js       career paths     data/logos.js   Devicon logo URLs
  context/            LearningProvider: all learner state + localStorage
  components/         Navbar, CourseCard, CodeRunner, CodeEditor, CodeBlock, …
  pages/              Home, Courses, CourseDetail, Lesson, Quiz, Certificate,
                      DocsLibrary, CourseDocs, Paths, Playground, Dashboard
  utils/              highlight.js (syntax highlighter), notes.js (Markdown export), format.js
```

### Adding a course

Add an object to one of `src/data/courses/*.js` (lessons are `[module, title, explanation, code]`, quiz rows are
`[question, options, answerIndex, explanation]`), then add its entry in `reference.js`, `setup.js` and, if Devicon has
a logo, `logos.js`.
