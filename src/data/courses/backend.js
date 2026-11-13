// Backend and database courses.
// Lesson rows: [module, title, explanation, code]   Quiz rows: [question, options, answerIndex, why]

export default [
  {
    id: 'nodejs',
    title: 'Node.js & Express',
    category: 'backend',
    level: 'Intermediate',
    icon: 'Node',
    color: '#5fa04e',
    lang: 'javascript',
    hours: 12,
    tagline: 'Build fast REST APIs with JavaScript on the server.',
    description:
      'Node.js runs JavaScript outside the browser. Learn modules and npm, the file system and event loop, then build a REST API with Express: routing, middleware, validation, error handling and authentication with JWT.',
    outcomes: ['Use npm and ES modules', 'Understand the event loop', 'Build a REST API with Express', 'Add middleware, validation and JWT auth'],
    lessons: [
      ['Node basics', 'Modules and npm', 'Start a project with `npm init -y`, install packages with `npm install express`, and add `"type": "module"` to use `import` / `export`. Node ships with built-in modules such as `fs`, `path`, `http` and `os`.', `// math.js
export const add = (a, b) => a + b
export default function average(nums) {
  return nums.reduce((s, n) => s + n, 0) / nums.length
}

// index.js
import average, { add } from './math.js'
import os from 'node:os'

console.log(add(2, 3), average([80, 90, 100]))
console.log('Running on', os.platform(), 'with', os.cpus().length, 'CPUs')`],
      ['Node basics', 'Files and the event loop', 'Node is single-threaded but non-blocking: slow I/O is handed off and its callback or promise resolves later, so one process serves thousands of connections. Prefer the promise APIs in `node:fs/promises`.', `import { readFile, writeFile } from 'node:fs/promises'

console.log('1. start')

setTimeout(() => console.log('4. timer callback'), 0)
Promise.resolve().then(() => console.log('3. promise microtask'))

console.log('2. end of script')

async function saveProgress() {
  await writeFile('progress.json', JSON.stringify({ lessons: 3 }))
  const text = await readFile('progress.json', 'utf8')
  console.log('Saved:', JSON.parse(text))
}
saveProgress()`],
      ['Express', 'Routing a REST API', 'Express maps HTTP methods and paths to handlers. Route params (`:id`) arrive in `req.params`, query strings in `req.query`, and JSON bodies in `req.body` after `express.json()`. Respond with `res.json()` and a proper status code.', `import express from 'express'

const app = express()
app.use(express.json())

let courses = [{ id: 1, title: 'Node.js' }]

app.get('/api/courses', (req, res) => res.json(courses))

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find((c) => c.id === Number(req.params.id))
  if (!course) return res.status(404).json({ error: 'Not found' })
  res.json(course)
})

app.post('/api/courses', (req, res) => {
  const course = { id: Date.now(), title: req.body.title }
  courses.push(course)
  res.status(201).json(course)
})

app.listen(3000, () => console.log('API on http://localhost:3000'))`],
      ['Express', 'Middleware and error handling', 'Middleware functions run in order for every request and can modify `req`/`res`, end the response, or call `next()`. Use them for logging, auth and validation. An error handler has four arguments and catches everything passed to `next(err)`.', `const logger = (req, res, next) => {
  const start = Date.now()
  res.on('finish', () => console.log(req.method, req.url, res.statusCode, Date.now() - start + 'ms'))
  next()
}

const requireTitle = (req, res, next) => {
  if (!req.body?.title?.trim()) return res.status(400).json({ error: 'title is required' })
  next()
}

app.use(logger)
app.post('/api/courses', requireTitle, (req, res) => res.status(201).json(req.body))

// error handler: must be last and take 4 args
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Something went wrong' })
})`],
      ['Security', 'Authentication with JWT', 'Hash passwords with bcrypt, never store them in plain text. On login, sign a JSON Web Token; clients send it in the `Authorization: Bearer` header and a middleware verifies it before protected routes. Keep secrets in environment variables.', `import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET

app.post('/api/login', async (req, res) => {
  const user = await db.users.findOne({ email: req.body.email })
  const ok = user && (await bcrypt.compare(req.body.password, user.passwordHash))
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' })

  const token = jwt.sign({ sub: user.id }, SECRET, { expiresIn: '1h' })
  res.json({ token })
})

function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  try {
    req.user = jwt.verify(token, SECRET)
    next()
  } catch {
    res.status(401).json({ error: 'Login required' })
  }
}

app.get('/api/me/progress', auth, (req, res) => res.json({ user: req.user.sub }))`],
    ],
    quiz: [
      ['Why can Node handle many connections on one thread?', ['It uses many threads per request', 'Non-blocking I/O and the event loop', 'It caches everything', 'It runs in the browser'], 1, 'Waiting on I/O doesn\'t block other work.'],
      ['In Express, where is :id from /courses/:id?', ['req.query.id', 'req.body.id', 'req.params.id', 'req.id'], 2, 'Route parameters live in req.params.'],
      ['What must middleware call to pass control on?', ['return()', 'next()', 'res.end()', 'continue()'], 1, 'Without next() (or a response) the request hangs.'],
      ['How should passwords be stored?', ['Plain text', 'Base64 encoded', 'Hashed with bcrypt', 'Inside the JWT'], 2, 'Hashing with a salt makes leaked databases far less dangerous.'],
    ],
  },
  {
    id: 'django',
    title: 'Django Web Framework',
    category: 'backend',
    level: 'Intermediate',
    icon: 'Dj',
    color: '#0c4b33',
    lang: 'python',
    hours: 12,
    tagline: 'The Python framework for perfectionists with deadlines.',
    description:
      'Django gives you an ORM, admin panel, authentication and templating out of the box. Build a project from models and migrations to views, templates, URL routing and the admin.',
    outcomes: ['Start Django projects and apps', 'Model data with the ORM and migrations', 'Write views, URLs and templates', 'Use the built-in admin and auth'],
    lessons: [
      ['Setup', 'Projects and apps', 'Install with `pip install django`, create a project with `django-admin startproject school`, and add features as apps with `python manage.py startapp courses`. Register each app in `INSTALLED_APPS`.', `# terminal
python -m venv venv && source venv/bin/activate
pip install django
django-admin startproject school .
python manage.py startapp courses
python manage.py runserver

# school/settings.py
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    # ...
    "courses",
]`],
      ['Data', 'Models and migrations', 'A model is a Python class describing a database table. Run `makemigrations` to generate migration files and `migrate` to apply them. The ORM then lets you query without writing SQL.', `# courses/models.py
from django.db import models

class Course(models.Model):
    LEVELS = [("B", "Beginner"), ("I", "Intermediate"), ("A", "Advanced")]
    title = models.CharField(max_length=120)
    slug = models.SlugField(unique=True)
    level = models.CharField(max_length=1, choices=LEVELS, default="B")
    hours = models.PositiveIntegerField()
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

# python manage.py makemigrations && python manage.py migrate
# Course.objects.filter(level="B").order_by("-hours")[:5]`],
      ['Web', 'Views and URLs', 'A view takes a request and returns a response. Map URLs to views in `urls.py`. Function views are simple; class-based views like `ListView` and `DetailView` remove boilerplate.', `# courses/views.py
from django.shortcuts import get_object_or_404, render
from .models import Course

def course_list(request):
    courses = Course.objects.order_by("title")
    return render(request, "courses/list.html", {"courses": courses})

def course_detail(request, slug):
    course = get_object_or_404(Course, slug=slug)
    return render(request, "courses/detail.html", {"course": course})

# courses/urls.py
from django.urls import path
from . import views
urlpatterns = [
    path("", views.course_list, name="course-list"),
    path("<slug:slug>/", views.course_detail, name="course-detail"),
]`],
      ['Web', 'Templates', 'Django templates render HTML with `{{ variable }}` and `{% tag %}` syntax. Templates can extend a base layout with `{% extends %}` and fill `{% block %}` sections, keeping pages consistent.', `<!-- templates/base.html -->
<html><body>
  <nav><a href="{% url 'course-list' %}">Courses</a></nav>
  {% block content %}{% endblock %}
</body></html>

<!-- templates/courses/list.html -->
{% extends "base.html" %}
{% block content %}
  <h1>{{ courses|length }} courses</h1>
  <ul>
  {% for c in courses %}
    <li><a href="{% url 'course-detail' c.slug %}">{{ c.title }}</a> · {{ c.get_level_display }}</li>
  {% empty %}
    <li>No courses yet.</li>
  {% endfor %}
  </ul>
{% endblock %}`],
      ['Batteries', 'Admin and authentication', 'Register models in `admin.py` to get a full management UI at `/admin`. Create a superuser with `createsuperuser`. Protect views with the `@login_required` decorator.', `# courses/admin.py
from django.contrib import admin
from .models import Course

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("title", "level", "hours")
    list_filter = ("level",)
    search_fields = ("title",)
    prepopulated_fields = {"slug": ("title",)}

# courses/views.py
from django.contrib.auth.decorators import login_required

@login_required
def my_courses(request):
    return render(request, "courses/mine.html", {"user": request.user})

# python manage.py createsuperuser`],
    ],
    quiz: [
      ['Which command applies database migrations?', ['makemigrations', 'migrate', 'runserver', 'startapp'], 1, 'makemigrations creates them; migrate applies them.'],
      ['Which file maps URLs to views?', ['models.py', 'urls.py', 'admin.py', 'settings.py'], 1, 'urlpatterns live in urls.py.'],
      ['How does a template output a variable?', ['{% var %}', '{{ var }}', '<%= var %>', '${var}'], 1, 'Double braces print, {% %} runs tags.'],
      ['Which decorator restricts a view to logged-in users?', ['@admin', '@login_required', '@auth', '@protected'], 1, 'It redirects anonymous users to the login page.'],
    ],
  },
  {
    id: 'springboot',
    title: 'Spring Boot Microservices',
    category: 'backend',
    level: 'Advanced',
    icon: 'Sp',
    color: '#6db33f',
    lang: 'java',
    hours: 12,
    tagline: 'Production-grade Java APIs with minimal configuration.',
    description:
      'Spring Boot is the leading Java framework for backends. Learn dependency injection, REST controllers, Spring Data JPA repositories, validation and exception handling, and configuration profiles.',
    outcomes: ['Bootstrap projects with Spring Initializr', 'Build REST controllers', 'Persist data with Spring Data JPA', 'Validate input and handle errors globally'],
    lessons: [
      ['Setup', 'Your first Spring Boot app', 'Generate a project at start.spring.io with the Web dependency. `@SpringBootApplication` turns on auto-configuration and component scanning. Run it with `./mvnw spring-boot:run` and an embedded Tomcat starts on port 8080.', `package com.codevidya;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@RestController
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }

    @GetMapping("/hello")
    public String hello(@RequestParam(defaultValue = "learner") String name) {
        return "Hello, " + name + "!";
    }
}`],
      ['Core', 'Dependency injection', 'Spring creates and wires objects (beans) for you. Annotate classes with `@Service`, `@Repository` or `@Component`, and declare what you need as constructor parameters; Spring injects them.', `@Service
public class CourseService {
    private final CourseRepository repo;

    public CourseService(CourseRepository repo) {   // injected by Spring
        this.repo = repo;
    }

    public List<Course> beginnerCourses() {
        return repo.findByLevel("Beginner");
    }
}`],
      ['Web', 'REST controllers', '`@RestController` methods return objects that are serialised to JSON. Map routes with `@GetMapping`, `@PostMapping` and so on; bind `@PathVariable` and `@RequestBody`. Return `ResponseEntity` to control status codes.', `@RestController
@RequestMapping("/api/courses")
public class CourseController {
    private final CourseService service;
    public CourseController(CourseService service) { this.service = service; }

    @GetMapping
    public List<Course> all() { return service.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Course> one(@PathVariable Long id) {
        return service.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Course> create(@Valid @RequestBody Course c) {
        return ResponseEntity.status(201).body(service.save(c));
    }
}`],
      ['Data', 'Spring Data JPA', 'Annotate a class with `@Entity` to map it to a table. Extend `JpaRepository` and Spring generates CRUD methods, and even derives queries from method names like `findByLevelOrderByHoursDesc`.', `@Entity
public class Course {
    @Id @GeneratedValue
    private Long id;

    @NotBlank
    private String title;
    private String level;
    private int hours;
    // getters and setters...
}

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByLevel(String level);
    List<Course> findByTitleContainingIgnoreCase(String q);
}

# application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/school
spring.jpa.hibernate.ddl-auto=update`],
      ['Quality', 'Validation and global errors', 'Bean Validation annotations (`@NotBlank`, `@Min`, `@Email`) plus `@Valid` reject bad input automatically. A `@RestControllerAdvice` class turns exceptions into clean JSON error responses across the whole app.', `@RestControllerAdvice
public class ApiErrors {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> invalid(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors()
          .forEach(e -> errors.put(e.getField(), e.getDefaultMessage()));
        return errors;
    }

    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> notFound() {
        return Map.of("error", "Resource not found");
    }
}`],
    ],
    quiz: [
      ['What does @SpringBootApplication enable?', ['Only logging', 'Auto-configuration and component scanning', 'A database', 'Unit tests'], 1, 'It combines @Configuration, @EnableAutoConfiguration and @ComponentScan.'],
      ['How does Spring inject dependencies in modern code?', ['Static fields', 'Constructor parameters', 'XML only', 'new keyword'], 1, 'Constructor injection is the recommended style.'],
      ['Extending JpaRepository gives you…', ['A UI', 'CRUD methods generated automatically', 'Security', 'Caching only'], 1, 'Spring Data implements the interface at runtime.'],
      ['Which annotation handles exceptions for all controllers?', ['@Controller', '@RestControllerAdvice', '@Service', '@Bean'], 1, 'It applies handlers globally.'],
    ],
  },
  {
    id: 'sql',
    title: 'SQL & Relational Databases',
    category: 'databases',
    level: 'Beginner',
    icon: 'SQL',
    color: '#336791',
    lang: 'sql',
    hours: 8,
    tagline: 'Query, join and shape data with the language every company uses.',
    description:
      'SQL is how you talk to relational databases like PostgreSQL and MySQL. Learn to create tables, query and filter, sort and aggregate, join tables together, and design schemas with keys and indexes.',
    outcomes: ['Create tables with constraints', 'Filter, sort and aggregate data', 'Join multiple tables', 'Design normalized schemas with indexes'],
    lessons: [
      ['Basics', 'Creating tables', 'A table has columns with data types and constraints. A `PRIMARY KEY` uniquely identifies each row, `NOT NULL` forbids empty values, and `INSERT` adds rows.', `CREATE TABLE courses (
  id      SERIAL PRIMARY KEY,
  title   VARCHAR(100) NOT NULL,
  level   VARCHAR(20)  DEFAULT 'Beginner',
  hours   INT CHECK (hours > 0)
);

INSERT INTO courses (title, level, hours) VALUES
  ('SQL', 'Beginner', 8),
  ('React', 'Intermediate', 14),
  ('Rust', 'Advanced', 14);`],
      ['Basics', 'SELECT, WHERE and ORDER BY', '`SELECT` picks columns, `WHERE` filters rows, `ORDER BY` sorts, and `LIMIT` caps the number of results. Combine conditions with `AND`, `OR`, `IN`, `BETWEEN` and `LIKE` patterns.', `SELECT title, hours
FROM courses
WHERE level IN ('Beginner', 'Intermediate')
  AND hours BETWEEN 6 AND 14
  AND title LIKE '%S%'
ORDER BY hours DESC, title
LIMIT 10;

UPDATE courses SET hours = 9 WHERE title = 'SQL';
DELETE FROM courses WHERE hours < 2;`],
      ['Analysis', 'Aggregates and GROUP BY', 'Aggregate functions `COUNT`, `SUM`, `AVG`, `MIN` and `MAX` summarise rows. `GROUP BY` produces one row per group, and `HAVING` filters groups (whereas `WHERE` filters individual rows).', `SELECT level,
       COUNT(*)            AS courses,
       ROUND(AVG(hours),1) AS avg_hours,
       MAX(hours)          AS longest
FROM courses
GROUP BY level
HAVING COUNT(*) >= 1
ORDER BY avg_hours DESC;`],
      ['Relationships', 'JOINs', 'Foreign keys link tables. `INNER JOIN` returns rows with matches in both tables; `LEFT JOIN` keeps every row from the left table and fills missing matches with NULL.', `CREATE TABLE enrollments (
  student_id INT REFERENCES students(id),
  course_id  INT REFERENCES courses(id),
  progress   INT DEFAULT 0,
  PRIMARY KEY (student_id, course_id)
);

-- Every student with the courses they take (if any)
SELECT s.name, c.title, e.progress
FROM students s
LEFT JOIN enrollments e ON e.student_id = s.id
LEFT JOIN courses c     ON c.id = e.course_id
ORDER BY s.name;`],
      ['Design', 'Indexes, subqueries and transactions', 'Indexes speed up lookups on frequently filtered columns. Subqueries and CTEs (`WITH`) break complex queries into steps. Transactions group statements so they all succeed or all roll back.', `CREATE INDEX idx_enroll_course ON enrollments(course_id);

-- Courses with above-average enrolment, using a CTE
WITH counts AS (
  SELECT course_id, COUNT(*) AS learners
  FROM enrollments GROUP BY course_id
)
SELECT c.title, counts.learners
FROM counts JOIN courses c ON c.id = counts.course_id
WHERE counts.learners > (SELECT AVG(learners) FROM counts);

BEGIN;
  UPDATE wallets SET balance = balance - 499 WHERE user_id = 7;
  INSERT INTO enrollments (student_id, course_id) VALUES (7, 2);
COMMIT;`],
    ],
    quiz: [
      ['Which clause filters groups after aggregation?', ['WHERE', 'HAVING', 'ORDER BY', 'LIMIT'], 1, 'WHERE filters rows before grouping; HAVING filters groups.'],
      ['A LEFT JOIN returns…', ['Only matching rows', 'All rows from the left table plus matches', 'All rows from both', 'Only unmatched rows'], 1, 'Unmatched right-side columns become NULL.'],
      ['What does a PRIMARY KEY guarantee?', ['Fast inserts', 'Each row is uniquely identifiable', 'Encryption', 'Sorted output'], 1, 'Primary keys are unique and not null.'],
      ['Why wrap statements in a transaction?', ['To speed them up', 'So they all succeed or all roll back', 'To create indexes', 'To format output'], 1, 'Transactions are atomic.'],
    ],
  },
  {
    id: 'mongodb',
    title: 'MongoDB & NoSQL',
    category: 'databases',
    level: 'Intermediate',
    icon: 'Mdb',
    color: '#47a248',
    lang: 'javascript',
    hours: 7,
    tagline: 'Flexible document databases for modern apps.',
    description:
      'MongoDB stores JSON-like documents instead of rows. Learn documents and collections, CRUD operations, query operators, the aggregation pipeline, indexing, and modelling data with Mongoose in Node.js.',
    outcomes: ['Perform CRUD on documents', 'Query with operators', 'Analyse data with aggregation pipelines', 'Model schemas with Mongoose'],
    lessons: [
      ['Basics', 'Documents and collections', 'A database holds collections, and collections hold documents: flexible JSON-like objects (stored as BSON) that can nest arrays and sub-documents. Every document gets a unique `_id`.', `// mongosh
use codevidya

db.courses.insertMany([
  { title: "MongoDB", level: "Intermediate", hours: 7, tags: ["nosql", "database"] },
  { title: "Python", level: "Beginner", hours: 12, tags: ["language"],
    instructor: { name: "Asha", rating: 4.9 } },
])

db.courses.find()`],
      ['CRUD', 'Querying with operators', 'Pass a filter object to `find`. Operators like `$gt`, `$in`, `$regex` and `$and` build conditions; dot notation reaches into nested fields. A projection chooses which fields to return.', `db.courses.find(
  { hours: { $gte: 8 }, level: { $in: ["Beginner", "Intermediate"] } },
  { title: 1, hours: 1, _id: 0 }          // projection
).sort({ hours: -1 }).limit(5)

db.courses.find({ "instructor.rating": { $gt: 4.5 } })
db.courses.find({ tags: "nosql" })        // matches array elements
db.courses.countDocuments({ level: "Beginner" })`],
      ['CRUD', 'Updating and deleting', '`updateOne` / `updateMany` take a filter and an update made of operators such as `$set`, `$inc` and `$push`. `upsert: true` inserts the document if nothing matches.', `db.courses.updateOne(
  { title: "MongoDB" },
  { $set: { level: "Advanced" }, $inc: { hours: 1 }, $push: { tags: "aggregation" } }
)

db.progress.updateOne(
  { user: "asha", course: "mongodb" },
  { $set: { lesson: 3 } },
  { upsert: true }
)

db.courses.deleteMany({ hours: { $lt: 1 } })`],
      ['Analysis', 'Aggregation pipeline', 'An aggregation pipeline passes documents through stages: `$match` filters, `$group` summarises, `$sort` orders, `$project` reshapes and `$lookup` joins another collection.', `db.enrollments.aggregate([
  { $match: { status: "active" } },
  { $group: { _id: "$course", learners: { $sum: 1 }, avgProgress: { $avg: "$progress" } } },
  { $sort: { learners: -1 } },
  { $lookup: { from: "courses", localField: "_id", foreignField: "_id", as: "course" } },
  { $project: { title: { $first: "$course.title" }, learners: 1, avgProgress: { $round: ["$avgProgress", 1] } } },
  { $limit: 5 },
])`],
      ['Node.js', 'Mongoose schemas and indexes', 'Mongoose adds schemas, validation and models on top of MongoDB in Node.js. Create indexes for fields you query often; `unique` indexes also prevent duplicates.', `import mongoose from 'mongoose'

await mongoose.connect(process.env.MONGO_URL)

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, unique: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  hours: { type: Number, min: 1 },
}, { timestamps: true })

courseSchema.index({ level: 1, hours: -1 })

const Course = mongoose.model('Course', courseSchema)

const created = await Course.create({ title: 'MongoDB', slug: 'mongodb', level: 'Intermediate', hours: 7 })
const list = await Course.find({ level: 'Beginner' }).sort('-hours').lean()`],
    ],
    quiz: [
      ['MongoDB stores data as…', ['Rows and columns', 'Documents in collections', 'Key-value strings only', 'Graphs'], 1, 'Documents are JSON-like (BSON).'],
      ['Which operator means "greater than"?', ['$gte', '$gt', '$more', '$lt'], 1, '$gt is strictly greater; $gte includes equality.'],
      ['Which update operator increments a number?', ['$set', '$push', '$inc', '$add'], 2, '$inc adds the given amount.'],
      ['Which aggregation stage joins another collection?', ['$match', '$group', '$lookup', '$project'], 2, '$lookup performs a left outer join.'],
    ],
  },
]
