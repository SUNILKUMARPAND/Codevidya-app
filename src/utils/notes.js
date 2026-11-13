import { EXTENSIONS } from '../data/courses/index.js'
import setup from '../data/setup.js'

// Build a complete, readable Markdown study guide for one course:
// overview, every lesson with its code, cheat sheet, key terms, practice quiz and links.
export function courseToMarkdown(course) {
  const fence = course.lang === 'text' ? '' : course.lang
  const lines = [
    `# ${course.title}`,
    '',
    `> ${course.tagline}`,
    '',
    `**Level:** ${course.level} · **Category:** ${course.categoryLabel} · **Lessons:** ${course.lessons.length} · **Estimated time:** ${course.hours} hours`,
    '',
    '## Overview',
    '',
    course.description,
    '',
    '## What you will learn',
    '',
    ...course.outcomes.map((o) => `- ${o}`),
    '',
  ]

  if (setup[course.id]) {
    const [text, commands] = setup[course.id]
    lines.push('## Setup', '', text, '', '```bash', commands, '```', '')
  }

  course.modules.forEach((module, m) => {
    lines.push(`## Module ${m + 1}: ${module.title}`, '')
    for (const lesson of module.lessons) {
      lines.push(`### ${lesson.number}. ${lesson.title}`, '', lesson.body, '', '```' + fence, lesson.code, '```', '')
    }
  })

  const { cheatsheet, terms, links } = course.reference
  if (cheatsheet.length) {
    lines.push('## Cheat sheet', '', '| Syntax | What it does |', '| --- | --- |')
    for (const [syntax, meaning] of cheatsheet) lines.push(`| \`${syntax.replace(/\|/g, '\\|')}\` | ${meaning} |`)
    lines.push('')
  }
  if (terms.length) {
    lines.push('## Key terms', '')
    for (const [term, definition] of terms) lines.push(`- **${term}**: ${definition}`)
    lines.push('')
  }

  lines.push('## Practice questions', '')
  course.quiz.forEach((q, i) => {
    lines.push(`${i + 1}. ${q.question}`)
    q.options.forEach((option, o) => lines.push(`   - ${String.fromCharCode(65 + o)}) ${option}`))
    lines.push(`   - **Answer:** ${String.fromCharCode(65 + q.answer)}) ${q.options[q.answer]}. ${q.explanation}`, '')
  })

  if (links.length) {
    lines.push('## Official documentation', '')
    for (const [label, url] of links) lines.push(`- [${label}](${url})`)
    lines.push('')
  }

  lines.push('---', `Study notes from CodeVidya · ${new Date().toLocaleDateString('en-IN', { dateStyle: 'medium' })}`)
  return lines.join('\n')
}

export function allCoursesToMarkdown(courses) {
  const toc = courses.map((c, i) => `${i + 1}. ${c.title} (${c.level})`).join('\n')
  return [`# CodeVidya: Complete Programming Notes`, '', `${courses.length} courses`, '', toc, '', ...courses.map(courseToMarkdown)].join(
    '\n\n',
  )
}

export function lessonFileName(course, lesson) {
  const ext = EXTENSIONS[course.lang] ?? 'txt'
  if (ext === 'Dockerfile') return 'Dockerfile'
  return `${course.id}-lesson-${lesson.number}.${ext}`
}

// Trigger a browser download for some text
export function downloadText(filename, text, type = 'text/markdown') {
  const url = URL.createObjectURL(new Blob([text], { type: `${type};charset=utf-8` }))
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.append(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
