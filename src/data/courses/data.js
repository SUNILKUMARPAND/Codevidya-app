// Data science, AI and computer-science fundamentals courses.
// Lesson rows: [module, title, explanation, code]   Quiz rows: [question, options, answerIndex, why]

export default [
  {
    id: 'datascience',
    title: 'Data Analysis with Pandas',
    category: 'data',
    level: 'Intermediate',
    icon: 'Pd',
    color: '#150458',
    lang: 'python',
    hours: 10,
    tagline: 'Clean, explore and visualise data with NumPy, Pandas and Matplotlib.',
    description:
      'Turn raw data into insight. Learn NumPy arrays, Pandas Series and DataFrames, loading CSVs, cleaning missing data, grouping and aggregating, and plotting charts with Matplotlib.',
    outcomes: ['Compute with NumPy arrays', 'Load and inspect DataFrames', 'Clean and transform messy data', 'Group, aggregate and plot results'],
    lessons: [
      ['Foundations', 'NumPy arrays', 'NumPy arrays hold same-typed numbers and support fast vectorised maths: operations apply to every element without Python loops. Shapes, slicing and boolean masks are the core skills.', `import numpy as np

marks = np.array([72, 95, 88, 61, 79])
print(marks.mean(), marks.max(), marks.std().round(2))
print(marks + 5)            # vectorised
print(marks[marks > 75])    # boolean mask

grid = np.arange(12).reshape(3, 4)
print(grid.shape)
print(grid[:, 1])           # second column`],
      ['Pandas', 'DataFrames and loading data', 'A DataFrame is a table with labelled rows and columns. Load files with `pd.read_csv`, then inspect with `head`, `info` and `describe`. Select columns with `df["col"]` and rows with `loc` (labels) or `iloc` (positions).', `import pandas as pd

df = pd.DataFrame({
    "student": ["Asha", "Ravi", "Meera", "Kiran"],
    "course": ["Python", "SQL", "Python", "React"],
    "score": [91, 78, 85, 69],
    "hours": [12, 8, 10, 14],
})
# df = pd.read_csv("enrollments.csv")

print(df.head())
print(df.describe())
print(df[df["score"] > 80][["student", "score"]])
print(df.loc[0, "student"], df.iloc[-1]["course"])`],
      ['Pandas', 'Cleaning data', 'Real data is messy. Find missing values with `isna`, fill or drop them, fix types with `astype` and `pd.to_datetime`, remove duplicates, and create new columns from existing ones.', `import pandas as pd
import numpy as np

df = pd.DataFrame({
    "name": ["Asha", "Ravi", "Ravi", None],
    "score": ["91", "78", "78", np.nan],
    "joined": ["2026-01-04", "2026-02-10", "2026-02-10", "2026-03-01"],
})

print(df.isna().sum())
df = df.drop_duplicates().dropna(subset=["name"])
df["score"] = df["score"].astype(float).fillna(0)
df["joined"] = pd.to_datetime(df["joined"])
df["passed"] = df["score"] >= 75
print(df)`],
      ['Analysis', 'Grouping and aggregation', '`groupby` splits data into groups, applies a function and combines the results, the "split-apply-combine" pattern. `agg` computes several statistics at once, and `pivot_table` reshapes data like a spreadsheet.', `summary = (
    df.groupby("course")
      .agg(students=("student", "count"),
           avg_score=("score", "mean"),
           total_hours=("hours", "sum"))
      .sort_values("avg_score", ascending=False)
)
print(summary)

df["band"] = pd.cut(df["score"], bins=[0, 70, 85, 100], labels=["C", "B", "A"])
print(df.pivot_table(index="course", columns="band", values="student",
                     aggfunc="count", fill_value=0, observed=False))`],
      ['Visualisation', 'Plotting with Matplotlib', 'Matplotlib draws charts; Pandas has a `.plot()` shortcut built on it. Pick the chart for the question: bars to compare categories, lines for trends over time, histograms for distributions, scatter for relationships.', `import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(10, 4))

summary["avg_score"].plot(kind="bar", ax=axes[0], color="#4f46e5")
axes[0].set_title("Average score by course")
axes[0].set_ylabel("Score")

axes[1].scatter(df["hours"], df["score"])
axes[1].set_xlabel("Hours studied")
axes[1].set_ylabel("Score")
axes[1].set_title("Hours vs score")

plt.tight_layout()
plt.show()`],
    ],
    quiz: [
      ['What makes NumPy operations fast?', ['Multithreading only', 'Vectorised operations on typed arrays', 'GPU by default', 'Caching'], 1, 'Loops run in compiled C code, not Python.'],
      ['Which selects rows by label?', ['iloc', 'loc', 'at_index', 'select'], 1, 'loc uses labels; iloc uses integer positions.'],
      ['Which method counts missing values per column?', ['df.null()', 'df.isna().sum()', 'df.missing()', 'df.count_nan()'], 1, 'isna gives booleans; sum counts the Trues.'],
      ['groupby implements which pattern?', ['MVC', 'Split-apply-combine', 'Observer', 'Map-only'], 1, 'Split into groups, apply a function, combine results.'],
    ],
  },
  {
    id: 'ml',
    title: 'Machine Learning Foundations',
    category: 'data',
    level: 'Advanced',
    icon: 'ML',
    color: '#ff6f00',
    lang: 'python',
    hours: 14,
    tagline: 'Train, evaluate and improve models with scikit-learn.',
    description:
      'Understand how machines learn from data. Cover supervised vs unsupervised learning, the train/test workflow, regression and classification, evaluation metrics, overfitting, and an introduction to neural networks.',
    outcomes: ['Frame problems as ML tasks', 'Train regression and classification models', 'Evaluate with the right metrics', 'Avoid overfitting with validation'],
    lessons: [
      ['Concepts', 'What is machine learning?', 'In supervised learning the model learns from labelled examples (features → target): regression predicts numbers, classification predicts categories. Unsupervised learning finds structure such as clusters without labels.', `# Supervised: features X -> label y
X = [[12, 3], [8, 1], [14, 5], [6, 0]]   # [hours studied, projects built]
y = [1, 0, 1, 0]                         # passed the exam?

# Regression target: a number   (e.g. salary, house price)
# Classification target: a class (e.g. spam / not spam)
# Clustering: no y at all, group similar learners together

from sklearn.tree import DecisionTreeClassifier
model = DecisionTreeClassifier().fit(X, y)
print(model.predict([[10, 2]]))`],
      ['Workflow', 'Train/test split and linear regression', 'Always hold out test data the model never sees during training, so you measure how it generalises. Linear regression fits a straight line (or plane) that minimises squared error.', `import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score

rng = np.random.default_rng(0)
hours = rng.uniform(1, 20, 200).reshape(-1, 1)
score = 40 + 2.5 * hours.ravel() + rng.normal(0, 5, 200)

X_train, X_test, y_train, y_test = train_test_split(hours, score, test_size=0.2, random_state=0)
model = LinearRegression().fit(X_train, y_train)
pred = model.predict(X_test)

print("slope", model.coef_[0].round(2), "intercept", model.intercept_.round(2))
print("MAE", mean_absolute_error(y_test, pred).round(2), "R2", r2_score(y_test, pred).round(3))`],
      ['Models', 'Classification', 'Classifiers like logistic regression, decision trees and random forests predict categories. Scale numeric features with a `Pipeline` so preprocessing is learned only from training data.', `from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, stratify=y, random_state=42)

for model in [make_pipeline(StandardScaler(), LogisticRegression()),
              RandomForestClassifier(n_estimators=200, random_state=42)]:
    model.fit(X_train, y_train)
    print(type(model).__name__, model.score(X_test, y_test).round(3))`],
      ['Evaluation', 'Metrics that matter', 'Accuracy can mislead on imbalanced data. Precision asks "of the predicted positives, how many were right?", recall asks "of the real positives, how many did we find?", and F1 balances them. A confusion matrix shows all four outcomes.', `from sklearn.metrics import classification_report, confusion_matrix

y_true = [1, 0, 1, 1, 0, 0, 1, 0, 0, 0]
y_pred = [1, 0, 0, 1, 0, 1, 1, 0, 0, 0]

print(confusion_matrix(y_true, y_pred))
# [[TN FP]
#  [FN TP]]
print(classification_report(y_true, y_pred, target_names=["fail", "pass"]))`],
      ['Generalisation', 'Overfitting, cross-validation and neural nets', 'An overfit model memorises training data and fails on new data. Detect it by comparing train vs validation scores; fix it with more data, simpler models or regularisation. Cross-validation gives a more reliable estimate. Neural networks stack layers of weighted sums and non-linear activations.', `from sklearn.datasets import load_digits
from sklearn.model_selection import cross_val_score
from sklearn.neural_network import MLPClassifier
from sklearn.tree import DecisionTreeClassifier

X, y = load_digits(return_X_y=True)

for depth in [2, 8, None]:
    tree = DecisionTreeClassifier(max_depth=depth, random_state=0)
    scores = cross_val_score(tree, X, y, cv=5)
    print("depth", depth, "cv accuracy", scores.mean().round(3))

mlp = MLPClassifier(hidden_layer_sizes=(64, 32), max_iter=500, random_state=0)
print("neural net", cross_val_score(mlp, X, y, cv=5).mean().round(3))`],
    ],
    quiz: [
      ['Predicting house prices is a…', ['Classification task', 'Regression task', 'Clustering task', 'Reinforcement task'], 1, 'The target is a continuous number.'],
      ['Why keep a separate test set?', ['To train faster', 'To measure performance on unseen data', 'To store backups', 'It is optional'], 1, 'It estimates real-world generalisation.'],
      ['High training accuracy but low test accuracy suggests…', ['Underfitting', 'Overfitting', 'Perfect model', 'Data leakage is impossible'], 1, 'The model memorised the training data.'],
      ['Recall measures…', ['Of predicted positives, how many were correct', 'Of actual positives, how many were found', 'Overall accuracy', 'Training speed'], 1, 'Recall = TP / (TP + FN).'],
    ],
  },
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    category: 'cs',
    level: 'Intermediate',
    icon: 'DSA',
    color: '#0ea5e9',
    lang: 'javascript',
    hours: 16,
    tagline: 'Crack coding interviews with Big-O, core structures and patterns.',
    description:
      'The foundation of every technical interview. Learn Big-O analysis, arrays and hash maps, stacks and queues, linked lists, trees and graphs, sorting and searching, recursion and dynamic programming. Run every example in the browser.',
    outcomes: ['Analyse time and space complexity', 'Choose the right data structure', 'Implement sorting, searching and traversals', 'Solve problems with recursion and DP'],
    lessons: [
      ['Analysis', 'Big-O notation', 'Big-O describes how runtime or memory grows as input size n grows, ignoring constants. Common classes: O(1) constant, O(log n) logarithmic, O(n) linear, O(n log n), O(n²) quadratic. Nested loops over the same input usually mean O(n²).', `// O(n): one pass
function sum(arr) {
  let total = 0
  for (const x of arr) total += x
  return total
}

// O(n^2): compare every pair
function hasDuplicateSlow(arr) {
  for (let i = 0; i < arr.length; i++)
    for (let j = i + 1; j < arr.length; j++)
      if (arr[i] === arr[j]) return true
  return false
}

// O(n): trade memory for speed with a Set
const hasDuplicate = (arr) => new Set(arr).size !== arr.length

console.log(sum([1, 2, 3]), hasDuplicateSlow([1, 2, 1]), hasDuplicate([4, 5, 6]))`],
      ['Structures', 'Hash maps, stacks and queues', 'Hash maps give O(1) average lookup by key, the key to many interview problems such as Two Sum. A stack is last-in-first-out (undo, bracket matching); a queue is first-in-first-out (BFS, task scheduling).', `// Two Sum with a hash map: O(n)
function twoSum(nums, target) {
  const seen = new Map()
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i]
    if (seen.has(need)) return [seen.get(need), i]
    seen.set(nums[i], i)
  }
  return null
}
console.log(twoSum([2, 7, 11, 15], 9))

// Balanced brackets with a stack
function isBalanced(s) {
  const pairs = { ')': '(', ']': '[', '}': '{' }
  const stack = []
  for (const ch of s) {
    if ('([{'.includes(ch)) stack.push(ch)
    else if (pairs[ch] && stack.pop() !== pairs[ch]) return false
  }
  return stack.length === 0
}
console.log(isBalanced('{[()]}'), isBalanced('(]'))`],
      ['Structures', 'Linked lists and trees', 'A linked list chains nodes with `next` pointers: O(1) insert at the head, O(n) lookup. A binary search tree keeps smaller values left and larger right, giving O(log n) search when balanced. Traversals visit nodes in a set order.', `class Node {
  constructor(value) { this.value = value; this.left = null; this.right = null }
}

function insert(root, value) {
  if (!root) return new Node(value)
  if (value < root.value) root.left = insert(root.left, value)
  else root.right = insert(root.right, value)
  return root
}

function inorder(node, out = []) {
  if (!node) return out
  inorder(node.left, out)
  out.push(node.value)
  inorder(node.right, out)
  return out
}

let root = null
for (const v of [50, 30, 70, 20, 40, 60, 80]) root = insert(root, v)
console.log('Sorted via in-order traversal:', inorder(root))`],
      ['Algorithms', 'Sorting, binary search and graphs', 'Merge sort splits, sorts and merges in O(n log n). Binary search halves a sorted range each step: O(log n). Breadth-first search explores a graph level by level with a queue and finds shortest paths in unweighted graphs.', `function mergeSort(arr) {
  if (arr.length <= 1) return arr
  const mid = arr.length >> 1
  const left = mergeSort(arr.slice(0, mid)), right = mergeSort(arr.slice(mid))
  const out = []
  while (left.length && right.length) out.push(left[0] <= right[0] ? left.shift() : right.shift())
  return [...out, ...left, ...right]
}

function binarySearch(sorted, target) {
  let lo = 0, hi = sorted.length - 1
  while (lo <= hi) {
    const mid = (lo + hi) >> 1
    if (sorted[mid] === target) return mid
    sorted[mid] < target ? (lo = mid + 1) : (hi = mid - 1)
  }
  return -1
}

function bfs(graph, start) {
  const seen = new Set([start]), queue = [start], order = []
  while (queue.length) {
    const node = queue.shift()
    order.push(node)
    for (const next of graph[node]) if (!seen.has(next)) { seen.add(next); queue.push(next) }
  }
  return order
}

const sorted = mergeSort([38, 27, 43, 3, 9, 82, 10])
console.log(sorted, 'index of 43:', binarySearch(sorted, 43))
console.log(bfs({ A: ['B', 'C'], B: ['D'], C: ['D', 'E'], D: [], E: [] }, 'A'))`],
      ['Techniques', 'Recursion and dynamic programming', 'Recursion solves a problem through smaller copies of itself and needs a base case. When subproblems repeat, dynamic programming stores their answers (memoisation or a bottom-up table), turning exponential time into polynomial.', `// Naive recursion is O(2^n); memoised is O(n)
function fib(n, memo = {}) {
  if (n <= 1) return n
  if (memo[n]) return memo[n]
  return (memo[n] = fib(n - 1, memo) + fib(n - 2, memo))
}
console.log('fib(50) =', fib(50))

// Bottom-up DP: fewest coins to make an amount
function minCoins(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity)
  dp[0] = 0
  for (let a = 1; a <= amount; a++)
    for (const c of coins)
      if (c <= a) dp[a] = Math.min(dp[a], dp[a - c] + 1)
  return dp[amount] === Infinity ? -1 : dp[amount]
}
console.log('coins for 63:', minCoins([1, 5, 10, 25], 63))`],
    ],
    quiz: [
      ['Binary search on a sorted array runs in…', ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], 1, 'It halves the search space each step.'],
      ['Which structure is last-in-first-out?', ['Queue', 'Stack', 'Heap', 'Graph'], 1, 'The last item pushed is the first popped.'],
      ['Average lookup time in a hash map is…', ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], 0, 'Hashing jumps straight to the bucket.'],
      ['Dynamic programming is useful when…', ['There are no subproblems', 'Subproblems overlap and repeat', 'Data is unsorted', 'Recursion is impossible'], 1, 'Storing repeated answers avoids recomputation.'],
    ],
  },
  {
    id: 'systemdesign',
    title: 'System Design Basics',
    category: 'cs',
    level: 'Advanced',
    icon: 'SD',
    color: '#8b5cf6',
    lang: 'text',
    hours: 8,
    tagline: 'Design scalable systems: load balancers, caches, queues and databases.',
    description:
      'Learn how large applications handle millions of users. Cover the request lifecycle, scaling vertically and horizontally, load balancing, caching, database replication and sharding, message queues, and how to approach a design interview.',
    outcomes: ['Explain how a request travels through a system', 'Scale with load balancers and caches', 'Choose database scaling strategies', 'Structure a system design interview answer'],
    lessons: [
      ['Fundamentals', 'Anatomy of a web request', 'A request resolves a domain via DNS, may be served by a CDN edge, hits a load balancer, reaches stateless app servers, and those read from caches and databases. Knowing each hop tells you where latency and failures come from.', `Browser
  │  1. DNS lookup: codevidya.dev -> 203.0.113.10
  ▼
CDN edge (static files, images, cached pages)
  │  2. cache miss -> forward
  ▼
Load balancer (TLS termination, health checks)
  │  3. pick a healthy server (round robin / least connections)
  ▼
App servers (stateless, horizontally scaled)
  │  4. check cache first
  ├──► Redis cache ── hit? return in ~1 ms
  ▼
Primary database ──replicates──► read replicas`],
      ['Scaling', 'Vertical vs horizontal scaling', 'Vertical scaling means a bigger machine: simple but capped and a single point of failure. Horizontal scaling adds more machines behind a load balancer, which requires stateless servers: keep sessions in a shared store such as Redis, not in server memory.', `Vertical:   [ 4 CPU ] ──► [ 64 CPU ]        simple, but has a ceiling

Horizontal:            ┌─► app-1
  users ─► LB ─────────┼─► app-2       add servers as traffic grows
                       └─► app-3
                            │
                     shared session store (Redis)

Rule: any server must be able to handle any request.`],
      ['Scaling', 'Caching strategies', 'Caches keep hot data in fast memory. Cache-aside (lazy loading) is the most common pattern: read the cache, fall back to the database on a miss, then populate the cache. Set a TTL and invalidate on writes to avoid stale data.', `function getCourse(id):
    key = "course:" + id
    course = redis.get(key)
    if course exists:
        return course                  # cache hit
    course = db.query("SELECT * FROM courses WHERE id = ?", id)
    redis.set(key, course, ttl=300)    # cache for 5 minutes
    return course

function updateCourse(id, data):
    db.update(id, data)
    redis.delete("course:" + id)      # invalidate`],
      ['Data', 'Replication, sharding and queues', 'Replication copies data to read replicas to scale reads and survive failures. Sharding splits data across databases by a key (such as user id) to scale writes. Message queues (Kafka, RabbitMQ, SQS) decouple services and absorb traffic spikes with asynchronous workers.', `Replication:  primary (writes) ──► replica 1 (reads)
                              └──► replica 2 (reads)

Sharding by user_id % 4:
  shard 0: users 0, 4, 8 ...     shard 1: users 1, 5, 9 ...
  shard 2: users 2, 6, 10 ...    shard 3: users 3, 7, 11 ...

Queue:
  API ──"send certificate email"──► [ queue ] ──► worker pool ──► email service
  (API responds instantly; workers retry failures)`],
      ['Interview', 'Approaching a design interview', 'Use a repeatable structure: clarify requirements, estimate scale, sketch the high-level design, deep-dive into the hardest components, then discuss bottlenecks and trade-offs. There is rarely one right answer, so explain your reasoning.', `Design: "URL shortener"

1. Requirements   shorten URL, redirect, custom alias, analytics; 100M URLs/month
2. Estimates      ~40 writes/s, ~4,000 reads/s (100:1 read heavy), ~500 bytes/URL
3. API            POST /urls {longUrl} -> {code}     GET /{code} -> 301 redirect
4. Data model     urls(code PK, long_url, user_id, created_at)
5. High level     LB -> app servers -> cache -> DB (key-value store)
6. Deep dive      code = base62(unique id) ; cache popular codes ; replicas for reads
7. Trade-offs     301 vs 302 (caching vs analytics), ID generation, hot keys`],
    ],
    quiz: [
      ['Horizontal scaling requires app servers to be…', ['Stateful', 'Stateless', 'Single-threaded', 'Larger'], 1, 'Any server must be able to handle any request.'],
      ['In cache-aside, what happens on a cache miss?', ['Return an error', 'Read the database and populate the cache', 'Wait for the cache', 'Restart the server'], 1, 'The app lazily loads data into the cache.'],
      ['Read replicas primarily help scale…', ['Writes', 'Reads', 'Storage format', 'DNS'], 1, 'Replicas serve read traffic.'],
      ['Why put a message queue between services?', ['To make calls synchronous', 'To decouple services and absorb spikes', 'To replace databases', 'To encrypt traffic'], 1, 'Producers and consumers work at their own pace.'],
    ],
  },
]
