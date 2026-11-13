// Real technology logos, loaded live from the Devicon CDN (MIT-licensed icon set).
// Every path below was checked to return 200. Courses missing here (no official
// logo exists) fall back to a coloured text badge.
const BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

const PATHS = {
  html: 'html5/html5-original',
  css: 'css3/css3-original',
  javascript: 'javascript/javascript-original',
  typescript: 'typescript/typescript-original',
  react: 'react/react-original',
  nextjs: 'nextjs/nextjs-original',
  vue: 'vuejs/vuejs-original',
  angular: 'angular/angular-original',
  python: 'python/python-original',
  java: 'java/java-original',
  c: 'c/c-original',
  cpp: 'cplusplus/cplusplus-original',
  csharp: 'csharp/csharp-original',
  go: 'go/go-original-wordmark',
  rust: 'rust/rust-original',
  kotlin: 'kotlin/kotlin-original',
  swift: 'swift/swift-original',
  flutter: 'flutter/flutter-original',
  php: 'php/php-original',
  ruby: 'ruby/ruby-original',
  nodejs: 'nodejs/nodejs-original',
  django: 'django/django-plain',
  springboot: 'spring/spring-original',
  sql: 'postgresql/postgresql-original',
  mongodb: 'mongodb/mongodb-original',
  datascience: 'pandas/pandas-original',
  ml: 'scikitlearn/scikitlearn-original',
  dsa: 'thealgorithms/thealgorithms-original',
  git: 'git/git-original',
  linux: 'linux/linux-original',
  docker: 'docker/docker-original',
  kubernetes: 'kubernetes/kubernetes-original',
  aws: 'amazonwebservices/amazonwebservices-original-wordmark',
}

export function logoUrl(courseId) {
  const path = PATHS[courseId]
  return path ? `${BASE}/${path}.svg` : null
}
