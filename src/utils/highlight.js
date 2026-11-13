// A small, dependency-free syntax highlighter. It is not a full parser: it
// tokenises comments, strings, numbers, keywords and calls well enough to make
// lesson code easy to read. Returns [{ type, text }] tokens.

const KEYWORDS = {
  javascript:
    'const let var function return if else for while do switch case break continue new class extends import export default from async await try catch finally throw typeof instanceof in of this super null undefined true false yield delete void static get set',
  python:
    'def return if elif else for while in not and or is import from as class try except finally raise with lambda pass break continue yield global nonlocal None True False async await self',
  java:
    'public private protected static final void class interface extends implements new return if else for while do switch case break continue try catch finally throw throws import package this super null true false abstract var record enum default int double float long boolean char byte short String',
  c: 'int float double char void long short unsigned signed const static struct typedef enum union return if else for while do switch case break continue sizeof NULL include define auto bool true false class public private protected virtual override explicit template typename namespace using new delete nullptr this std',
  csharp:
    'using namespace public private protected internal static readonly void class interface record struct enum new return if else for foreach in while do switch case break continue try catch finally throw var async await get set init null true false this base string int double decimal bool object override virtual abstract',
  go: 'package import func return if else for range switch case default break continue go defer chan select struct interface map type var const nil true false make len append error string int float64 bool',
  rust: 'fn let mut const static struct enum impl trait pub use mod crate self Self return if else match for while loop in break continue as ref move where async await dyn true false Some None Ok Err String Vec Option Result',
  kotlin:
    'fun val var class data object interface return if else when for while in is as null true false import package private public override open abstract suspend this super it',
  swift:
    'let var func return if else guard for in while switch case default struct class enum protocol extension import init self nil true false some private public static mutating',
  dart: 'void var final const class extends implements return if else for in while switch case break new this super null true false import async await required override late String int double bool',
  php: 'echo function return if else elseif foreach as for while class interface implements extends public private protected readonly new namespace use fn array null true false static',
  ruby: 'def end if elsif else unless case when then while do return class module include attr_reader attr_accessor self nil true false puts require super yield',
  sql: 'SELECT FROM WHERE AND OR NOT IN BETWEEN LIKE ORDER BY GROUP HAVING LIMIT INSERT INTO VALUES UPDATE SET DELETE CREATE TABLE INDEX ON JOIN LEFT RIGHT INNER OUTER AS WITH PRIMARY KEY REFERENCES DEFAULT CHECK NULL BEGIN COMMIT ROLLBACK DESC ASC COUNT SUM AVG MIN MAX ROUND SERIAL INT VARCHAR DISTINCT',
  bash: 'if then else fi for in do done while case esac function return echo export cd set local sudo git docker kubectl aws npm',
  yaml: 'true false null',
  dockerfile: 'FROM WORKDIR COPY RUN CMD ENV EXPOSE USER ARG ENTRYPOINT AS LABEL VOLUME',
}

// Which keyword list and comment style each lesson language uses
const LANGS = {
  javascript: ['javascript', 'c'],
  jsx: ['javascript', 'c'],
  typescript: ['javascript interface type enum implements private public readonly keyof as', 'c'],
  python: ['python', 'hash'],
  java: ['java', 'c'],
  c: ['c', 'c'],
  cpp: ['c', 'c'],
  csharp: ['csharp', 'c'],
  go: ['go', 'c'],
  rust: ['rust', 'c'],
  kotlin: ['kotlin', 'c'],
  swift: ['swift', 'c'],
  dart: ['dart', 'c'],
  php: ['php', 'c'],
  ruby: ['ruby', 'hash'],
  sql: ['sql', 'sql'],
  bash: ['bash', 'hash'],
  yaml: ['yaml', 'hash'],
  dockerfile: ['dockerfile', 'hash'],
}

const STRING = String.raw`"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|` + '`(?:\\\\.|[^`\\\\])*`'
const COMMENTS = {
  c: String.raw`\/\/[^\n]*|\/\*[\s\S]*?\*\/`,
  hash: String.raw`#[^\n{][^\n]*|#$`,
  sql: String.raw`--[^\n]*`,
}

const cache = new Map()

function compile(lang) {
  if (cache.has(lang)) return cache.get(lang)
  const [words, comment] = LANGS[lang]
  const list = words
    .split(' ')
    .flatMap((word) => (KEYWORDS[word] ? KEYWORDS[word].split(' ') : [word]))
  const keywords = new Set(lang === 'sql' ? list.map((w) => w.toUpperCase()) : list)
  // Python, Ruby & co. treat "#{" inside strings as interpolation; strings are matched first anyway
  const regex = new RegExp(
    `(${COMMENTS[comment]})|(${STRING})|(@[A-Za-z_]\\w*)|(\\b\\d[\\d_]*(?:\\.\\d+)?[fmLu]?\\b)|([A-Za-z_$][\\w$]*)`,
    'gm',
  )
  const compiled = { regex, keywords, upper: lang === 'sql' }
  cache.set(lang, compiled)
  return compiled
}

function highlightHtml(code) {
  const tokens = []
  const regex = /(<!--[\s\S]*?-->)|(<\/?[A-Za-z][\w-]*)|(\/?>)|("[^"\n]*"|'[^'\n]*')|([:@]?[A-Za-z][\w:.-]*)(?==)/g
  let last = 0
  let inTag = false
  for (const m of code.matchAll(regex)) {
    if (m.index > last) tokens.push({ type: 'plain', text: code.slice(last, m.index) })
    const [text, comment, open, close, str, attr] = m
    if (comment) tokens.push({ type: 'comment', text })
    else if (open) { tokens.push({ type: 'tag', text }); inTag = true }
    else if (close) { tokens.push({ type: 'tag', text }); inTag = false }
    else if (str) tokens.push({ type: inTag ? 'string' : 'plain', text })
    else if (attr) tokens.push({ type: inTag ? 'attr' : 'plain', text })
    last = m.index + text.length
  }
  if (last < code.length) tokens.push({ type: 'plain', text: code.slice(last) })
  return tokens
}

export function highlight(code, lang) {
  if (lang === 'html') return highlightHtml(code)
  if (!LANGS[lang]) return [{ type: 'plain', text: code }]

  const { regex, keywords, upper } = compile(lang)
  const tokens = []
  let last = 0
  regex.lastIndex = 0
  for (const m of code.matchAll(regex)) {
    if (m.index > last) tokens.push({ type: 'plain', text: code.slice(last, m.index) })
    const [text, comment, str, meta, num, word] = m
    let type = 'plain'
    if (comment) type = 'comment'
    else if (str) type = 'string'
    else if (meta) type = 'meta'
    else if (num) type = 'number'
    else if (word) {
      const next = code[m.index + text.length]
      if (keywords.has(upper ? text.toUpperCase() : text)) type = 'keyword'
      else if (next === '(' || next === '!') type = 'function'
      else if (/^[A-Z][a-z]/.test(text)) type = 'type'
    }
    tokens.push({ type, text })
    last = m.index + text.length
  }
  if (last < code.length) tokens.push({ type: 'plain', text: code.slice(last) })
  return tokens
}
