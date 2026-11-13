// General-purpose programming language courses.
// Lesson rows: [module, title, explanation, code]   Quiz rows: [question, options, answerIndex, why]

export default [
  {
    id: 'python',
    title: 'Python Programming',
    category: 'languages',
    level: 'Beginner',
    icon: 'Py',
    color: '#3776ab',
    lang: 'python',
    hours: 12,
    tagline: 'Readable, powerful and everywhere: from scripts to AI.',
    description:
      'Python is the most popular first language and the backbone of data science, automation and AI. Learn variables, control flow, functions, lists and dictionaries, classes, and file handling with clean, readable code.',
    outcomes: ['Write Python scripts confidently', 'Use lists, dicts and comprehensions', 'Build classes and objects', 'Read and write files and handle errors'],
    lessons: [
      ['Basics', 'Variables, types and input', 'Python needs no type declarations or semicolons; indentation defines blocks. Core types are `int`, `float`, `str`, `bool` and `None`. f-strings (`f"..."`) embed values directly in text.', `name = "Asha"
age = 21
height = 1.62
is_student = True

print(f"{name} is {age} years old")
print(type(age), type(height), type(name))

# input() always returns a string
# years = int(input("Years of coding? "))`],
      ['Basics', 'Conditions and loops', 'Use `if / elif / else` for decisions. `for` loops iterate over any sequence, and `range(n)` generates numbers. `while` repeats while a condition is true. Blocks are defined by indentation (4 spaces).', `score = 78

if score >= 90:
    grade = "A"
elif score >= 75:
    grade = "B"
else:
    grade = "C"
print("Grade:", grade)

for i in range(1, 6):
    print(i, "squared is", i ** 2)

count = 3
while count > 0:
    print("Countdown", count)
    count -= 1`],
      ['Data structures', 'Lists, dictionaries and comprehensions', 'A `list` is an ordered, changeable collection; a `dict` maps keys to values; a `set` holds unique items; a `tuple` is an unchangeable list. Comprehensions build new collections in one readable line.', `skills = ["python", "sql", "git"]
skills.append("docker")
print(skills[0], len(skills))

student = {"name": "Ravi", "marks": {"math": 91, "cs": 97}}
print(student["marks"]["cs"])

squares = [n * n for n in range(10) if n % 2 == 0]
upper = {s: s.upper() for s in skills}
print(squares)
print(upper)`],
      ['Functions & OOP', 'Functions and classes', 'Define functions with `def`; they can have default and keyword arguments. Classes bundle data and behaviour: `__init__` sets up a new object and `self` refers to that object. Subclasses inherit and can override methods.', `def area(width, height=1):
    return width * height

print(area(5, 3), area(width=4))

class Course:
    def __init__(self, title, hours):
        self.title = title
        self.hours = hours

    def describe(self):
        return f"{self.title} ({self.hours}h)"

class LiveCourse(Course):
    def describe(self):
        return super().describe() + " - live!"

print(LiveCourse("Python", 12).describe())`],
      ['Practical Python', 'Files, errors and modules', 'Open files with a `with` block so they close automatically. Handle failures with `try / except / finally`. Import code from the huge standard library or from packages installed with `pip install`.', `import json
from pathlib import Path

data = {"course": "python", "progress": 80}
Path("progress.json").write_text(json.dumps(data))

with open("progress.json") as f:
    loaded = json.load(f)
print(loaded["progress"])

try:
    value = int("abc")
except ValueError as err:
    print("Could not convert:", err)
finally:
    print("Done")`],
    ],
    quiz: [
      ['How does Python define code blocks?', ['Curly braces', 'Indentation', 'begin/end', 'Semicolons'], 1, 'Consistent indentation (usually 4 spaces) marks a block.'],
      ['What does [n * 2 for n in range(3)] produce?', ['[0, 2, 4]', '[2, 4, 6]', '[1, 2, 3]', 'Error'], 0, 'range(3) is 0, 1, 2.'],
      ['Which type maps keys to values?', ['list', 'tuple', 'dict', 'set'], 2, 'Dictionaries store key → value pairs.'],
      ['Why use "with open(...)"?', ['It is faster', 'It closes the file automatically', 'It encrypts files', 'It is required syntax'], 1, 'The context manager closes the file even if an error occurs.'],
    ],
  },
  {
    id: 'java',
    title: 'Java Programming',
    category: 'languages',
    level: 'Beginner',
    icon: 'Java',
    color: '#ea2d2e',
    lang: 'java',
    hours: 14,
    tagline: 'Object-oriented, strongly typed and powering billions of devices.',
    description:
      'Java runs enterprise backends, Android apps and big-data systems. Learn the syntax, types, control flow, classes and objects, inheritance and interfaces, collections, and exception handling.',
    outcomes: ['Write and run Java programs', 'Design classes using OOP principles', 'Use ArrayList and HashMap', 'Handle exceptions properly'],
    lessons: [
      ['Basics', 'Hello Java', 'Every Java program lives in a class, and execution starts at `public static void main(String[] args)`. Statements end with semicolons. Compile with `javac Main.java` and run with `java Main`.', `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");

        int lessons = 5;
        double rating = 4.8;
        String course = "Java";
        boolean free = true;

        System.out.println(course + " has " + lessons + " lessons");
    }
}`],
      ['Basics', 'Control flow and methods', 'Java has `if/else`, `switch`, `for`, enhanced `for-each`, and `while`. Methods declare their return type and parameter types. `static` methods belong to the class, not an object.', `public class Grades {
    static String grade(int score) {
        if (score >= 90) return "A";
        else if (score >= 75) return "B";
        return "C";
    }

    public static void main(String[] args) {
        int[] scores = {95, 80, 60};
        for (int s : scores) {
            System.out.println(s + " -> " + grade(s));
        }
    }
}`],
      ['OOP', 'Classes and objects', 'A class is a blueprint; objects are instances created with `new`. Keep fields `private` and expose behaviour through public methods (encapsulation). A constructor initialises the object.', `public class Student {
    private final String name;
    private int xp;

    public Student(String name) {
        this.name = name;
    }

    public void completeLesson() { xp += 10; }
    public int getXp() { return xp; }
    public String getName() { return name; }

    public static void main(String[] args) {
        Student s = new Student("Meera");
        s.completeLesson();
        s.completeLesson();
        System.out.println(s.getName() + " has " + s.getXp() + " XP");
    }
}`],
      ['OOP', 'Inheritance and interfaces', 'A class `extends` one parent and inherits its members; `@Override` replaces a method. An `interface` defines a contract that many unrelated classes can `implement`. This enables polymorphism.', `interface Payable {
    double fee();
}

abstract class Course implements Payable {
    protected String title;
    Course(String title) { this.title = title; }
}

class VideoCourse extends Course {
    VideoCourse(String t) { super(t); }
    @Override public double fee() { return 499; }
}

class LiveCourse extends Course {
    LiveCourse(String t) { super(t); }
    @Override public double fee() { return 1999; }
}
// Payable p = new LiveCourse("Java");  p.fee() -> 1999.0`],
      ['Core library', 'Collections and exceptions', '`ArrayList` is a resizable list and `HashMap` stores key/value pairs; generics like `<String>` keep them type-safe. Handle errors with `try / catch / finally`; checked exceptions must be caught or declared.', `import java.util.*;

public class Library {
    public static void main(String[] args) {
        List<String> skills = new ArrayList<>(List.of("Java", "SQL"));
        skills.add("Spring");

        Map<String, Integer> marks = new HashMap<>();
        marks.put("java", 92);
        marks.put("sql", 85);

        for (String s : skills) System.out.println(s);
        System.out.println("Java marks: " + marks.get("java"));

        try {
            int x = Integer.parseInt("abc");
        } catch (NumberFormatException e) {
            System.out.println("Bad number: " + e.getMessage());
        }
    }
}`],
    ],
    quiz: [
      ['Where does a Java program start executing?', ['The constructor', 'public static void main(String[] args)', 'The first class in the file', 'init()'], 1, 'The JVM looks for the main method.'],
      ['Which keyword creates a new object?', ['create', 'make', 'new', 'this'], 2, 'new allocates and constructs an instance.'],
      ['A class can extend how many classes?', ['One', 'Two', 'Unlimited', 'None'], 0, 'Java has single inheritance for classes, but a class may implement many interfaces.'],
      ['Which collection stores key/value pairs?', ['ArrayList', 'HashSet', 'HashMap', 'LinkedList'], 2, 'Maps associate keys with values.'],
    ],
  },
  {
    id: 'c',
    title: 'C Programming',
    category: 'languages',
    level: 'Beginner',
    icon: 'C',
    color: '#5c6bc0',
    lang: 'c',
    hours: 10,
    tagline: 'Learn how computers really work: memory, pointers and speed.',
    description:
      'C is the language behind operating systems, embedded devices and many other languages. Understand data types, control flow, functions, arrays and strings, pointers, structures and dynamic memory.',
    outcomes: ['Write and compile C programs', 'Understand pointers and memory addresses', 'Use arrays, strings and structs', 'Allocate and free memory safely'],
    lessons: [
      ['Basics', 'Hello C', 'A C program starts in `main`. `#include <stdio.h>` brings in input/output functions like `printf`, whose format specifiers (`%d`, `%f`, `%s`, `%c`) print values. Compile with `gcc hello.c -o hello`.', `#include <stdio.h>

int main(void) {
    int lessons = 5;
    float rating = 4.7f;
    char grade = 'A';

    printf("Hello, C!\\n");
    printf("%d lessons, rating %.1f, grade %c\\n", lessons, rating, grade);
    return 0;
}`],
      ['Basics', 'Control flow and functions', 'C has `if`, `switch`, `for`, `while` and `do-while`. Functions must be declared before use, often with a prototype at the top. Arguments are passed by value (copied).', `#include <stdio.h>

int factorial(int n);   /* prototype */

int main(void) {
    for (int i = 1; i <= 5; i++) {
        printf("%d! = %d\\n", i, factorial(i));
    }
    return 0;
}

int factorial(int n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}`],
      ['Memory', 'Arrays and strings', 'Arrays are fixed-size blocks of same-typed values, indexed from 0. A string is a `char` array ending with the null character `\\0`. `<string.h>` provides `strlen`, `strcpy` and `strcmp`.', `#include <stdio.h>
#include <string.h>

int main(void) {
    int marks[5] = {90, 85, 77, 93, 88};
    int sum = 0;
    for (int i = 0; i < 5; i++) sum += marks[i];
    printf("Average: %.2f\\n", sum / 5.0);

    char name[20] = "Code";
    strcat(name, "Vidya");
    printf("%s has %zu chars\\n", name, strlen(name));
    return 0;
}`],
      ['Memory', 'Pointers', 'A pointer stores a memory address. `&x` gives the address of `x` and `*p` reads or writes the value at that address. Passing pointers lets a function modify the caller\'s variables.', `#include <stdio.h>

void swap(int *a, int *b) {
    int tmp = *a;
    *a = *b;
    *b = tmp;
}

int main(void) {
    int x = 10, y = 20;
    int *p = &x;
    printf("x lives at %p and holds %d\\n", (void *)p, *p);

    swap(&x, &y);
    printf("After swap: x=%d y=%d\\n", x, y);
    return 0;
}`],
      ['Memory', 'Structs and dynamic memory', 'A `struct` groups related fields into one type. `malloc` allocates memory at runtime and returns a pointer; every `malloc` must be matched with a `free`, or the program leaks memory.', `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    char name[30];
    int xp;
} Student;

int main(void) {
    int n = 3;
    Student *list = malloc(n * sizeof(Student));
    if (list == NULL) return 1;

    for (int i = 0; i < n; i++) {
        snprintf(list[i].name, 30, "Student %d", i + 1);
        list[i].xp = (i + 1) * 100;
    }
    for (int i = 0; i < n; i++) printf("%s: %d XP\\n", list[i].name, list[i].xp);

    free(list);
    return 0;
}`],
    ],
    quiz: [
      ['Which format specifier prints an int?', ['%s', '%d', '%f', '%c'], 1, '%d is for signed decimal integers.'],
      ['What ends every C string?', ['A newline', 'A space', 'The null character \\0', 'Nothing'], 2, 'String functions read until they hit \\0.'],
      ['If p = &x, what does *p give?', ['The address of x', 'The value of x', 'The address of p', 'An error'], 1, '* dereferences the pointer.'],
      ['What must follow every successful malloc?', ['realloc', 'free', 'printf', 'return'], 1, 'Otherwise the memory leaks.'],
    ],
  },
  {
    id: 'cpp',
    title: 'C++ Programming',
    category: 'languages',
    level: 'Intermediate',
    icon: 'C++',
    color: '#00599c',
    lang: 'cpp',
    hours: 14,
    tagline: 'High-performance OOP for games, systems and competitive coding.',
    description:
      'C++ adds classes, templates and a powerful standard library to C. Learn I/O streams, references, classes and constructors, the STL containers and algorithms, and modern memory management with smart pointers.',
    outcomes: ['Use modern C++ syntax', 'Design classes with constructors and inheritance', 'Use STL containers and algorithms', 'Manage memory with smart pointers'],
    lessons: [
      ['Basics', 'Hello C++', 'Use `std::cout` with `<<` to print and `std::cin` with `>>` to read. `auto` lets the compiler infer types, and `std::string` handles text safely. Compile with `g++ -std=c++20 main.cpp`.', `#include <iostream>
#include <string>

int main() {
    std::string course = "C++";
    auto lessons = 5;           // int
    double rating = 4.9;

    std::cout << "Welcome to " << course << "!\\n";
    std::cout << lessons << " lessons, rated " << rating << '\\n';
    return 0;
}`],
      ['Basics', 'References and functions', 'A reference (`int&`) is an alias for an existing variable, so functions can modify arguments without pointers. Pass large objects as `const&` to avoid copying. Functions can be overloaded by parameter types.', `#include <iostream>
#include <string>

void addXp(int& xp, int amount) { xp += amount; }

void print(const std::string& msg) { std::cout << msg << '\\n'; }
void print(int n) { std::cout << "Number: " << n << '\\n'; }

int main() {
    int xp = 0;
    addXp(xp, 50);
    print("XP updated");
    print(xp);
}`],
      ['OOP', 'Classes and inheritance', 'Classes have `private` data and `public` methods. Constructors use initialiser lists. Mark methods `virtual` so a derived class can `override` them and calls through a base pointer pick the right version.', `#include <iostream>
#include <string>

class Shape {
public:
    virtual double area() const = 0;   // pure virtual
    virtual ~Shape() = default;
};

class Circle : public Shape {
    double r;
public:
    explicit Circle(double r) : r(r) {}
    double area() const override { return 3.14159 * r * r; }
};

class Square : public Shape {
    double s;
public:
    explicit Square(double s) : s(s) {}
    double area() const override { return s * s; }
};`],
      ['STL', 'Containers and algorithms', 'The Standard Template Library gives you `vector`, `map`, `set`, `unordered_map` and more, plus algorithms like `sort`, `find` and `accumulate` that work on any container through iterators.', `#include <algorithm>
#include <iostream>
#include <map>
#include <numeric>
#include <vector>

int main() {
    std::vector<int> scores = {72, 95, 88, 61};
    std::sort(scores.begin(), scores.end());
    int total = std::accumulate(scores.begin(), scores.end(), 0);

    std::map<std::string, int> xp = {{"asha", 120}, {"ravi", 90}};
    xp["meera"] = 150;

    for (int s : scores) std::cout << s << ' ';
    std::cout << "\\nTotal " << total << '\\n';
    for (const auto& [name, points] : xp) std::cout << name << ": " << points << '\\n';
}`],
      ['Modern C++', 'Smart pointers and RAII', 'RAII ties a resource\'s lifetime to an object: when the object goes out of scope, it cleans up. `std::unique_ptr` owns memory exclusively and `std::shared_ptr` counts owners, so you almost never need `new` / `delete`.', `#include <iostream>
#include <memory>

struct Lesson {
    std::string title;
    explicit Lesson(std::string t) : title(std::move(t)) { std::cout << "open " << title << '\\n'; }
    ~Lesson() { std::cout << "close " << title << '\\n'; }
};

int main() {
    auto a = std::make_unique<Lesson>("Pointers");
    auto b = std::make_shared<Lesson>("STL");
    auto c = b;                       // two owners
    std::cout << "owners: " << b.use_count() << '\\n';
}   // memory freed automatically here`],
    ],
    quiz: [
      ['Which operator sends output to std::cout?', ['>>', '<<', '->', '::'], 1, '<< is the stream insertion operator.'],
      ['Why pass a std::string as const&?', ['To modify it', 'To avoid copying it', 'It is required', 'To make it global'], 1, 'A const reference avoids a copy and prevents modification.'],
      ['Which keyword lets a derived class override a method?', ['static', 'virtual', 'inline', 'friend'], 1, 'The base method must be virtual for dynamic dispatch.'],
      ['Which smart pointer has exactly one owner?', ['shared_ptr', 'weak_ptr', 'unique_ptr', 'auto_ptr'], 2, 'unique_ptr cannot be copied, only moved.'],
    ],
  },
  {
    id: 'csharp',
    title: 'C# and .NET',
    category: 'languages',
    level: 'Intermediate',
    icon: 'C#',
    color: '#68217a',
    lang: 'csharp',
    hours: 12,
    tagline: 'Microsoft\'s modern language for apps, games (Unity) and APIs.',
    description:
      'C# is a versatile, type-safe language used for web APIs with ASP.NET, desktop apps and Unity games. Learn syntax, classes and properties, records, LINQ for querying data, and async/await.',
    outcomes: ['Write C# console apps with .NET', 'Use properties, classes and records', 'Query collections with LINQ', 'Write asynchronous code'],
    lessons: [
      ['Basics', 'Hello C#', 'Modern C# supports top-level statements, so a program can be a single line. Create a project with `dotnet new console` and run it with `dotnet run`. String interpolation uses `$"..."`.', `var course = "C#";
int lessons = 5;
decimal price = 799.00m;

Console.WriteLine($"Welcome to {course}!");
Console.WriteLine($"{lessons} lessons for ₹{price}");

if (lessons > 3)
{
    Console.WriteLine("That's a full course.");
}`],
      ['OOP', 'Classes and properties', 'Properties expose data with `get` and `set` and can contain logic. Auto-properties (`{ get; set; }`) are the short form. `init` makes a property settable only during object creation.', `public class Student
{
    public string Name { get; init; } = "";
    public int Xp { get; private set; }

    public void Complete(int points) => Xp += points;
}

var s = new Student { Name = "Kiran" };
s.Complete(40);
Console.WriteLine($"{s.Name}: {s.Xp} XP");`],
      ['OOP', 'Records, interfaces and pattern matching', 'A `record` is a concise immutable data type with value equality. Interfaces define contracts. `switch` expressions with patterns make branching on type or shape clean.', `public interface IShape { double Area(); }
public record Circle(double R) : IShape { public double Area() => Math.PI * R * R; }
public record Rect(double W, double H) : IShape { public double Area() => W * H; }

IShape[] shapes = { new Circle(1), new Rect(2, 3) };

foreach (var shape in shapes)
{
    string label = shape switch
    {
        Circle { R: > 5 } => "big circle",
        Circle => "circle",
        Rect r when r.W == r.H => "square",
        _ => "rectangle",
    };
    Console.WriteLine($"{label}: {shape.Area():F2}");
}`],
      ['Data', 'LINQ', 'LINQ (Language Integrated Query) filters, sorts, groups and projects any collection with chainable methods like `Where`, `OrderBy`, `Select` and `GroupBy`.', `var courses = new[]
{
    new { Title = "C#", Level = "Intermediate", Hours = 12 },
    new { Title = "HTML", Level = "Beginner", Hours = 6 },
    new { Title = "Python", Level = "Beginner", Hours = 12 },
};

var beginner = courses
    .Where(c => c.Level == "Beginner")
    .OrderByDescending(c => c.Hours)
    .Select(c => c.Title);

Console.WriteLine(string.Join(", ", beginner));
Console.WriteLine($"Total hours: {courses.Sum(c => c.Hours)}");`],
      ['Async', 'async / await and tasks', 'A `Task` represents ongoing work. Mark methods `async` and `await` tasks to keep apps responsive while waiting on I/O. `Task.WhenAll` runs several operations concurrently.', `using System.Net.Http;

async Task<int> GetLengthAsync(string url)
{
    using var client = new HttpClient();
    string html = await client.GetStringAsync(url);
    return html.Length;
}

var tasks = new[] { "https://example.com", "https://dotnet.microsoft.com" }
    .Select(GetLengthAsync);

int[] sizes = await Task.WhenAll(tasks);
Console.WriteLine($"Downloaded {sizes.Sum()} characters");`],
    ],
    quiz: [
      ['Which command creates a new console project?', ['dotnet run', 'dotnet new console', 'csc new', 'npm init'], 1, 'dotnet new scaffolds projects from templates.'],
      ['What does a record give you automatically?', ['Mutable fields', 'Value-based equality', 'Database access', 'Threads'], 1, 'Two records with the same values are equal.'],
      ['Which LINQ method filters items?', ['Select', 'Where', 'OrderBy', 'Sum'], 1, 'Where keeps items that match a predicate.'],
      ['What does await do?', ['Blocks the thread', 'Asynchronously waits for a Task', 'Starts a new process', 'Throws an exception'], 1, 'The thread is freed while the task runs.'],
    ],
  },
  {
    id: 'go',
    title: 'Go (Golang)',
    category: 'languages',
    level: 'Intermediate',
    icon: 'Go',
    color: '#00add8',
    lang: 'go',
    hours: 10,
    tagline: 'Simple, fast and built for concurrency and cloud services.',
    description:
      'Go powers Docker, Kubernetes and countless cloud backends. Learn its minimal syntax, slices and maps, structs and methods, interfaces, explicit error handling, and goroutines with channels.',
    outcomes: ['Write idiomatic Go programs', 'Use slices, maps and structs', 'Handle errors the Go way', 'Run concurrent work with goroutines and channels'],
    lessons: [
      ['Basics', 'Hello Go', 'Every Go file belongs to a package; executables use `package main` and start at `func main()`. `:=` declares and infers a variable. Run code with `go run main.go`.', `package main

import "fmt"

func main() {
    course := "Go"
    lessons := 5
    var rating float64 = 4.8

    fmt.Println("Welcome to", course)
    fmt.Printf("%d lessons, rated %.1f\\n", lessons, rating)
}`],
      ['Basics', 'Slices, maps and loops', 'Go has one loop keyword: `for`. Slices are dynamic views over arrays and grow with `append`. Maps are built-in hash tables. `range` iterates over both.', `package main

import "fmt"

func main() {
    skills := []string{"go", "docker"}
    skills = append(skills, "kubernetes")

    xp := map[string]int{"asha": 120, "ravi": 80}
    xp["meera"] = 150

    for i, s := range skills {
        fmt.Println(i, s)
    }
    for name, points := range xp {
        fmt.Println(name, points)
    }
}`],
      ['Types', 'Structs, methods and interfaces', 'Structs group fields. Methods attach to types with a receiver. Interfaces are satisfied implicitly: any type with the right methods implements them, with no `implements` keyword.', `package main

import "fmt"

type Notifier interface {
    Notify(msg string)
}

type Email struct{ Address string }
type SMS struct{ Phone string }

func (e Email) Notify(msg string) { fmt.Println("email", e.Address, msg) }
func (s SMS) Notify(msg string)   { fmt.Println("sms", s.Phone, msg) }

func main() {
    channels := []Notifier{Email{"a@b.com"}, SMS{"+91 98765 43210"}}
    for _, n := range channels {
        n.Notify("Your course starts today!")
    }
}`],
      ['Types', 'Error handling', 'Go has no exceptions. Functions return an `error` as the last value, and callers check `if err != nil`. Wrap errors with `fmt.Errorf("...: %w", err)` to add context.', `package main

import (
    "errors"
    "fmt"
    "strconv"
)

var ErrNegative = errors.New("negative value")

func parseHours(s string) (int, error) {
    n, err := strconv.Atoi(s)
    if err != nil {
        return 0, fmt.Errorf("parse %q: %w", s, err)
    }
    if n < 0 {
        return 0, ErrNegative
    }
    return n, nil
}

func main() {
    for _, in := range []string{"12", "abc", "-3"} {
        h, err := parseHours(in)
        if err != nil {
            fmt.Println("error:", err)
            continue
        }
        fmt.Println("hours:", h)
    }
}`],
      ['Concurrency', 'Goroutines and channels', 'Prefix a call with `go` to run it concurrently in a lightweight goroutine. Channels pass values safely between goroutines, and `sync.WaitGroup` waits for a group to finish.', `package main

import (
    "fmt"
    "sync"
    "time"
)

func worker(id int, jobs <-chan int, results chan<- string, wg *sync.WaitGroup) {
    defer wg.Done()
    for j := range jobs {
        time.Sleep(100 * time.Millisecond)
        results <- fmt.Sprintf("worker %d finished job %d", id, j)
    }
}

func main() {
    jobs := make(chan int, 6)
    results := make(chan string, 6)
    var wg sync.WaitGroup

    for w := 1; w <= 3; w++ {
        wg.Add(1)
        go worker(w, jobs, results, &wg)
    }
    for j := 1; j <= 6; j++ { jobs <- j }
    close(jobs)
    wg.Wait()
    close(results)
    for r := range results { fmt.Println(r) }
}`],
    ],
    quiz: [
      ['How many loop keywords does Go have?', ['One (for)', 'Two', 'Three', 'None'], 0, 'for covers while-style and range loops too.'],
      ['How does a type implement an interface in Go?', ['implements keyword', 'Implicitly, by having the methods', 'Inheritance', 'Annotations'], 1, 'Interfaces are satisfied structurally.'],
      ['How does Go report errors?', ['Exceptions', 'Returning an error value', 'Global errno', 'Panics only'], 1, 'Callers check if err != nil.'],
      ['What does the go keyword do before a function call?', ['Compiles it', 'Runs it in a new goroutine', 'Makes it public', 'Defers it'], 1, 'Goroutines are cheap concurrent functions.'],
    ],
  },
  {
    id: 'rust',
    title: 'Rust Programming',
    category: 'languages',
    level: 'Advanced',
    icon: 'Rs',
    color: '#ce422b',
    lang: 'rust',
    hours: 14,
    tagline: 'Memory safety without a garbage collector.',
    description:
      'Rust gives C-level performance while preventing whole classes of bugs at compile time. Learn variables and mutability, ownership and borrowing, structs and enums, pattern matching, error handling with Result, and traits.',
    outcomes: ['Understand ownership and borrowing', 'Model data with structs and enums', 'Handle errors with Result and ?', 'Write generic code with traits'],
    lessons: [
      ['Basics', 'Hello Rust and Cargo', 'Cargo is Rust\'s build tool and package manager: `cargo new app` then `cargo run`. Variables are immutable by default; add `mut` to allow changes. `println!` is a macro (note the `!`).', `fn main() {
    let course = "Rust";
    let mut lessons = 4;
    lessons += 1;

    let rating: f64 = 4.9;
    println!("Welcome to {course}!");
    println!("{} lessons, rated {:.1}", lessons, rating);
}`],
      ['Ownership', 'Ownership and borrowing', 'Each value has one owner; when the owner goes out of scope, the value is dropped. Assigning a `String` moves it. Borrow with `&` (shared, read-only) or `&mut` (exclusive) to use a value without taking ownership.', `fn length(s: &String) -> usize {     // borrows, doesn't own
    s.len()
}

fn add_suffix(s: &mut String) {
    s.push_str(" Rocks");
}

fn main() {
    let a = String::from("Rust");
    let b = a;               // ownership moves to b
    // println!("{a}");      // error: a was moved

    let mut c = b.clone();
    add_suffix(&mut c);
    println!("{} ({} chars)", c, length(&c));
}`],
      ['Types', 'Structs, enums and match', 'Structs hold named fields; `impl` blocks add methods. Enums can carry data in each variant, and `match` must handle every case, so the compiler catches forgotten states.', `struct Student { name: String, xp: u32 }

impl Student {
    fn level(&self) -> &str {
        if self.xp >= 100 { "pro" } else { "rookie" }
    }
}

enum Event { Enrolled(String), Completed { course: String, score: u8 }, LoggedOut }

fn describe(e: &Event) -> String {
    match e {
        Event::Enrolled(c) => format!("enrolled in {c}"),
        Event::Completed { course, score } if *score >= 75 => format!("passed {course}"),
        Event::Completed { course, .. } => format!("finished {course}"),
        Event::LoggedOut => "bye".to_string(),
    }
}

fn main() {
    let s = Student { name: "Asha".into(), xp: 140 };
    println!("{} is a {}", s.name, s.level());
    println!("{}", describe(&Event::Completed { course: "Rust".into(), score: 90 }));
}`],
      ['Errors', 'Option and Result', 'Rust has no null and no exceptions. `Option<T>` is `Some(value)` or `None`; `Result<T, E>` is `Ok(value)` or `Err(error)`. The `?` operator returns the error early, keeping code tidy.', `use std::num::ParseIntError;

fn parse_hours(input: &str) -> Result<u32, ParseIntError> {
    let hours: u32 = input.trim().parse()?;   // ? returns Err early
    Ok(hours * 60)
}

fn find_course(id: u32) -> Option<&'static str> {
    match id { 1 => Some("Rust"), 2 => Some("Go"), _ => None }
}

fn main() {
    match parse_hours("3") {
        Ok(m) => println!("{m} minutes"),
        Err(e) => println!("error: {e}"),
    }
    println!("{}", find_course(9).unwrap_or("not found"));
}`],
      ['Abstraction', 'Traits and generics', 'A trait defines shared behaviour, like an interface. Generic functions use trait bounds (`T: Summary`) to accept any type implementing that trait, and are compiled to fast specialised code.', `trait Summary {
    fn summary(&self) -> String;
    fn badge(&self) -> String { format!("[{}]", self.summary()) } // default method
}

struct Course { title: String, hours: u32 }
struct Quiz { questions: usize }

impl Summary for Course {
    fn summary(&self) -> String { format!("{} - {}h", self.title, self.hours) }
}
impl Summary for Quiz {
    fn summary(&self) -> String { format!("{} questions", self.questions) }
}

fn print_all<T: Summary>(items: &[T]) {
    for i in items { println!("{}", i.badge()); }
}

fn main() {
    print_all(&[Course { title: "Rust".into(), hours: 14 }]);
    print_all(&[Quiz { questions: 4 }]);
}`],
    ],
    quiz: [
      ['Variables in Rust are by default…', ['Mutable', 'Immutable', 'Global', 'Nullable'], 1, 'Add mut to make a binding mutable.'],
      ['What happens with let b = a; where a is a String?', ['a is copied', 'Ownership moves to b', 'Both share it', 'Compile error'], 1, 'a can no longer be used afterwards.'],
      ['What does the ? operator do on a Result?', ['Unwraps or panics', 'Returns the Err early from the function', 'Ignores errors', 'Converts to Option'], 1, 'It propagates the error to the caller.'],
      ['Rust\'s equivalent of interfaces is…', ['Modules', 'Traits', 'Macros', 'Crates'], 1, 'Traits define shared behaviour.'],
    ],
  },
  {
    id: 'kotlin',
    title: 'Kotlin for Developers',
    category: 'mobile',
    level: 'Intermediate',
    icon: 'Kt',
    color: '#7f52ff',
    lang: 'kotlin',
    hours: 10,
    tagline: 'Concise, null-safe and the official language for Android.',
    description:
      'Kotlin is the modern language for Android and runs anywhere Java does. Learn val/var, null safety, functions and lambdas, data classes, collections, and coroutines for asynchronous code.',
    outcomes: ['Write concise Kotlin code', 'Avoid null-pointer crashes with null safety', 'Use data classes and collections', 'Run async work with coroutines'],
    lessons: [
      ['Basics', 'val, var and functions', '`val` is read-only, `var` can change. Types are inferred. Functions use `fun`, and a single-expression function can use `=`. String templates use `$name` or `${expr}`.', `fun greet(name: String, greeting: String = "Hello") = "$greeting, $name!"

fun main() {
    val course = "Kotlin"
    var lessons = 4
    lessons++

    println(greet("Asha"))
    println("$course has $lessons lessons, \${lessons * 12} minutes total")
}`],
      ['Basics', 'Null safety', 'Types cannot hold `null` unless you add `?`. The safe call `?.` returns null instead of crashing, the Elvis operator `?:` supplies a default, and smart casts kick in after a null check.', `fun main() {
    val name: String = "Ravi"
    val nickname: String? = null

    println(nickname?.length)          // null, no crash
    println(nickname?.length ?: 0)     // 0
    if (nickname != null) {
        println(nickname.uppercase())  // smart cast to String
    }
    println(name.length)
}`],
      ['Types', 'Classes and data classes', 'Primary constructors live in the class header. A `data class` auto-generates `equals`, `hashCode`, `toString` and `copy`. `when` is a powerful replacement for `switch`.', `data class Course(val title: String, val hours: Int, val level: String = "Beginner")

fun label(c: Course) = when {
    c.hours > 12 -> "long"
    c.hours > 6 -> "medium"
    else -> "short"
}

fun main() {
    val k = Course("Kotlin", 10, "Intermediate")
    val copy = k.copy(hours = 14)
    println(k)
    println("\${copy.title} is \${label(copy)}")
    println(k == Course("Kotlin", 10, "Intermediate"))   // true
}`],
      ['Functional', 'Collections and lambdas', 'Kotlin collections come with expressive operations: `filter`, `map`, `sortedBy`, `groupBy`, `sumOf`. Lambdas use `{ }` and `it` names the single parameter.', `fun main() {
    val scores = listOf(88, 42, 97, 75, 63)
    val passed = scores.filter { it >= 60 }.sortedDescending()
    println(passed)

    val words = listOf("kotlin", "android", "coroutines", "kmp")
    val byLength = words.groupBy { it.length > 6 }
    println(byLength)
    println(words.joinToString(" | ") { it.replaceFirstChar(Char::uppercase) })
}`],
      ['Async', 'Coroutines', 'Coroutines are lightweight threads. `suspend` functions can pause without blocking. `launch` starts fire-and-forget work, `async/await` returns a result, and `delay` suspends instead of sleeping.', `import kotlinx.coroutines.*

suspend fun fetchLessons(course: String): Int {
    delay(300)          // pretend network call
    return course.length
}

fun main() = runBlocking {
    val a = async { fetchLessons("Kotlin") }
    val b = async { fetchLessons("Android") }
    println("Total lessons: \${a.await() + b.await()}")   // both ran concurrently

    launch { println("Background sync done") }
}`],
    ],
    quiz: [
      ['Which declares a read-only variable?', ['var', 'val', 'let', 'const var'], 1, 'val cannot be reassigned.'],
      ['What does name?.length return if name is null?', ['0', 'null', 'Throws NPE', '-1'], 1, 'The safe call short-circuits to null.'],
      ['What does a data class generate automatically?', ['UI layouts', 'equals, hashCode, toString and copy', 'Database tables', 'Threads'], 1, 'Boilerplate methods are generated.'],
      ['Which keyword marks a function that can pause in a coroutine?', ['async', 'await', 'suspend', 'yield'], 2, 'suspend functions can be paused and resumed.'],
    ],
  },
  {
    id: 'swift',
    title: 'Swift & iOS Basics',
    category: 'mobile',
    level: 'Intermediate',
    icon: 'Sw',
    color: '#f05138',
    lang: 'swift',
    hours: 10,
    tagline: 'Apple\'s fast, safe language for iPhone, iPad and Mac apps.',
    description:
      'Swift is the language for every Apple platform. Learn constants and variables, optionals, functions and closures, structs vs classes, protocols, and build a first screen with SwiftUI.',
    outcomes: ['Write safe Swift with optionals', 'Use structs, classes and protocols', 'Pass closures as arguments', 'Build simple SwiftUI views'],
    lessons: [
      ['Basics', 'Constants, variables and types', '`let` declares a constant and `var` a variable; Swift infers types. String interpolation uses `\\(value)`. Try code instantly in an Xcode Playground.', `let course = "Swift"
var lessons = 4
lessons += 1
let rating: Double = 4.8

print("Welcome to \\(course)!")
print("\\(lessons) lessons rated \\(rating)")

let skills = ["Swift", "SwiftUI", "Xcode"]
for skill in skills { print("•", skill) }`],
      ['Basics', 'Optionals', 'An optional (`String?`) either holds a value or `nil`. Unwrap it safely with `if let`, `guard let`, or a default via `??`. Force unwrapping with `!` crashes on nil, so avoid it.', `func findCourse(id: Int) -> String? {
    id == 1 ? "Swift" : nil
}

if let title = findCourse(id: 1) {
    print("Found \\(title)")
}

func enroll(id: Int) {
    guard let title = findCourse(id: id) else {
        print("No course \\(id)")
        return
    }
    print("Enrolled in \\(title)")
}

enroll(id: 2)
print(findCourse(id: 3) ?? "Unknown")`],
      ['Types', 'Structs, classes and protocols', 'Structs are value types (copied) and are preferred in Swift; classes are reference types with inheritance. Protocols define requirements that structs, classes and enums can adopt.', `protocol Describable {
    var summary: String { get }
}

struct Course: Describable {
    var title: String
    var hours: Int
    var summary: String { "\\(title) · \\(hours)h" }
}

var a = Course(title: "Swift", hours: 10)
var b = a          // copy
b.hours = 20
print(a.summary, "|", b.summary)   // a is unchanged`],
      ['Functional', 'Closures and higher-order functions', 'Closures are inline functions, written `{ (params) in body }`. With trailing-closure syntax and shorthand `$0`, collection operations like `map`, `filter` and `reduce` become very short.', `let scores = [92, 58, 77, 84]

let passed = scores.filter { $0 >= 60 }
let curved = scores.map { min($0 + 5, 100) }
let total = scores.reduce(0, +)

print(passed, curved, total)

let sorted = ["Swift", "Go", "Kotlin"].sorted { $0.count < $1.count }
print(sorted)`],
      ['SwiftUI', 'Your first SwiftUI view', 'SwiftUI builds UI declaratively: a view is a struct with a `body`. `@State` stores local state, and changing it automatically refreshes the view. Stacks (`VStack`, `HStack`) arrange children.', `import SwiftUI

struct CounterView: View {
    @State private var count = 0

    var body: some View {
        VStack(spacing: 16) {
            Text("Lessons completed: \\(count)")
                .font(.title2)
            Button("Complete lesson") {
                count += 1
            }
            .buttonStyle(.borderedProminent)
        }
        .padding()
    }
}`],
    ],
    quiz: [
      ['Which keyword declares a constant in Swift?', ['var', 'let', 'const', 'final'], 1, 'let bindings cannot change.'],
      ['What does the ?? operator do?', ['Force unwraps', 'Provides a default if the optional is nil', 'Compares optionals', 'Creates an optional'], 1, 'It is the nil-coalescing operator.'],
      ['Structs in Swift are…', ['Reference types', 'Value types', 'Only for UI', 'Protocols'], 1, 'Assigning a struct copies it.'],
      ['What does @State do in SwiftUI?', ['Declares a global', 'Stores view state and refreshes the view when it changes', 'Makes a network call', 'Defines a protocol'], 1, 'SwiftUI re-renders on state changes.'],
    ],
  },
  {
    id: 'flutter',
    title: 'Dart & Flutter',
    category: 'mobile',
    level: 'Intermediate',
    icon: 'Fl',
    color: '#02569b',
    lang: 'dart',
    hours: 12,
    tagline: 'One codebase for Android, iOS, web and desktop.',
    description:
      'Flutter is Google\'s UI toolkit and Dart is its language. Learn Dart basics, null safety and classes, then build Flutter apps from widgets, layouts, stateful widgets, and lists.',
    outcomes: ['Write Dart with null safety', 'Compose UIs from widgets', 'Manage state with StatefulWidget', 'Build scrolling lists and navigation'],
    lessons: [
      ['Dart', 'Dart basics', 'Dart is typed with inference: use `var`, `final` (set once) or `const` (compile-time). Types are non-nullable unless marked `?`. String interpolation uses `$name`.', `void main() {
  final course = 'Flutter';
  var lessons = 4;
  lessons++;
  String? nickname;

  print('Welcome to $course - $lessons lessons');
  print(nickname ?? 'no nickname');

  final skills = ['Dart', 'Widgets', 'State'];
  for (final s in skills) print('- $s');
}`],
      ['Dart', 'Classes and async', 'Dart classes support named constructors and named parameters with `required`. `Future` represents async results, consumed with `async / await`.', `class Course {
  final String title;
  final int hours;
  const Course({required this.title, this.hours = 10});
}

Future<List<Course>> loadCourses() async {
  await Future.delayed(const Duration(milliseconds: 300));
  return const [Course(title: 'Dart'), Course(title: 'Flutter', hours: 12)];
}

Future<void> main() async {
  final courses = await loadCourses();
  for (final c in courses) print('\${c.title}: \${c.hours}h');
}`],
      ['Flutter', 'Widgets and layout', 'In Flutter, everything is a widget. Compose them: `Column` and `Row` lay out children, `Padding` adds space, `Text` and `Icon` display content. `MaterialApp` and `Scaffold` give you an app shell.', `import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('CodeVidya')),
        body: const Padding(
          padding: EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Learn Flutter', style: TextStyle(fontSize: 24)),
              Row(children: [Icon(Icons.timer), Text(' 12 hours')]),
            ],
          ),
        ),
      ),
    );
  }
}`],
      ['Flutter', 'Stateful widgets', 'A `StatefulWidget` keeps mutable state in a `State` object. Call `setState` to change data and Flutter rebuilds the widget. Use stateless widgets wherever state is not needed.', `class LessonCounter extends StatefulWidget {
  const LessonCounter({super.key});
  @override
  State<LessonCounter> createState() => _LessonCounterState();
}

class _LessonCounterState extends State<LessonCounter> {
  int _done = 0;

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Text('Completed: $_done'),
      ElevatedButton(
        onPressed: () => setState(() => _done++),
        child: const Text('Complete lesson'),
      ),
    ]);
  }
}`],
      ['Flutter', 'Lists and navigation', '`ListView.builder` efficiently renders long scrolling lists by building only visible items. `Navigator.push` opens a new screen and `Navigator.pop` goes back.', `class CourseList extends StatelessWidget {
  final List<String> courses = const ['Dart', 'Flutter', 'Firebase'];
  const CourseList({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: courses.length,
      itemBuilder: (context, i) => ListTile(
        leading: const Icon(Icons.school),
        title: Text(courses[i]),
        onTap: () => Navigator.push(
          context,
          MaterialPageRoute(builder: (_) => Scaffold(
            appBar: AppBar(title: Text(courses[i])),
          )),
        ),
      ),
    );
  }
}`],
    ],
    quiz: [
      ['In Flutter, the UI is built from…', ['Activities', 'Widgets', 'Storyboards', 'Fragments'], 1, 'Everything on screen is a widget.'],
      ['Which method triggers a rebuild in a StatefulWidget?', ['rebuild()', 'setState()', 'update()', 'render()'], 1, 'setState marks the widget dirty.'],
      ['What is the difference between final and const in Dart?', ['None', 'final is set once at runtime; const is a compile-time constant', 'const can change', 'final is only for classes'], 1, 'const values are known at compile time.'],
      ['Which widget renders long lists efficiently?', ['Column', 'ListView.builder', 'Stack', 'Container'], 1, 'It lazily builds visible items.'],
    ],
  },
  {
    id: 'php',
    title: 'PHP for the Web',
    category: 'backend',
    level: 'Beginner',
    icon: 'PHP',
    color: '#777bb4',
    lang: 'php',
    hours: 8,
    tagline: 'The server-side language behind WordPress and Laravel.',
    description:
      'PHP runs a huge share of the web. Learn syntax and variables, arrays, functions, handling forms securely, object-oriented PHP, and talking to databases with PDO.',
    outcomes: ['Write PHP scripts and templates', 'Process form input safely', 'Use classes and namespaces', 'Query MySQL securely with PDO'],
    lessons: [
      ['Basics', 'Hello PHP', 'PHP code sits inside `<?php ... ?>` tags and runs on the server, sending HTML to the browser. Variables start with `$`. Double-quoted strings interpolate variables. Try it with `php -S localhost:8000`.', `<?php
$course = "PHP";
$lessons = 5;
$price = 499.0;

echo "<h1>Welcome to $course</h1>";
echo "<p>$lessons lessons for ₹" . number_format($price, 2) . "</p>";

if ($lessons > 3) {
    echo "<p>Full course!</p>";
}`],
      ['Basics', 'Arrays and functions', 'PHP arrays work as both lists and key/value maps. `foreach` loops over them. Functions can declare parameter and return types, and arrow functions `fn() =>` are handy with `array_map` and `array_filter`.', `<?php
$skills = ["PHP", "MySQL", "Laravel"];
$marks = ["php" => 91, "sql" => 84];

foreach ($marks as $subject => $score) {
    echo "$subject: $score\\n";
}

function average(array $nums): float {
    return array_sum($nums) / count($nums);
}

$upper = array_map(fn($s) => strtoupper($s), $skills);
echo implode(", ", $upper) . "\\n";
echo "Average: " . average(array_values($marks));`],
      ['Web', 'Forms and security', 'Form data arrives in `$_POST` or `$_GET`. Never trust it: validate input and escape output with `htmlspecialchars` to prevent XSS. Use `filter_var` for emails and numbers.', `<?php
$errors = [];
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = trim($_POST["name"] ?? "");
    $email = filter_var($_POST["email"] ?? "", FILTER_VALIDATE_EMAIL);

    if ($name === "") $errors[] = "Name is required";
    if (!$email) $errors[] = "Valid email is required";
}
?>
<form method="post">
  <input name="name" value="<?= htmlspecialchars($name ?? "") ?>">
  <input name="email" type="email">
  <button>Enroll</button>
</form>
<?php foreach ($errors as $e): ?>
  <p class="error"><?= htmlspecialchars($e) ?></p>
<?php endforeach; ?>`],
      ['OOP', 'Classes and namespaces', 'PHP supports classes, interfaces and traits. Constructor property promotion declares and assigns properties in one place. Namespaces and Composer autoloading organise large codebases.', `<?php
namespace App\\Models;

interface HasPrice { public function price(): float; }

class Course implements HasPrice {
    public function __construct(
        public readonly string $title,
        private float $basePrice,
        private float $discount = 0,
    ) {}

    public function price(): float {
        return $this->basePrice * (1 - $this->discount);
    }
}

$c = new Course("Laravel", 1000, 0.2);
echo "{$c->title}: ₹{$c->price()}";`],
      ['Data', 'Databases with PDO', 'PDO connects to MySQL, PostgreSQL and SQLite with one API. Always use prepared statements with placeholders; they stop SQL injection by keeping data separate from the query.', `<?php
$pdo = new PDO("mysql:host=localhost;dbname=school", "root", "secret", [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
]);

$stmt = $pdo->prepare("SELECT title, hours FROM courses WHERE level = :level");
$stmt->execute(["level" => "Beginner"]);

foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $row) {
    echo $row["title"] . " (" . $row["hours"] . "h)\\n";
}

$insert = $pdo->prepare("INSERT INTO enrollments (user_id, course) VALUES (?, ?)");
$insert->execute([42, "php"]);`],
    ],
    quiz: [
      ['PHP variables start with…', ['@', '$', '#', '&'], 1, 'Every PHP variable name begins with $.'],
      ['Which function escapes output to prevent XSS?', ['strip_tags', 'htmlspecialchars', 'addslashes', 'urlencode'], 1, 'It converts <, >, & and quotes to entities.'],
      ['What prevents SQL injection in PDO?', ['String concatenation', 'Prepared statements', 'echo', 'mysql_query'], 1, 'Placeholders keep data separate from SQL.'],
      ['Where does POST form data arrive?', ['$_GET', '$_POST', '$_SESSION', '$_FILES only'], 1, 'POST fields are in $_POST.'],
    ],
  },
  {
    id: 'ruby',
    title: 'Ruby Programming',
    category: 'languages',
    level: 'Beginner',
    icon: 'Rb',
    color: '#cc342d',
    lang: 'ruby',
    hours: 8,
    tagline: 'A programmer\'s best friend: elegant, expressive, joyful.',
    description:
      'Ruby is designed for developer happiness and powers Ruby on Rails. Learn its syntax, everything-is-an-object model, blocks and iterators, hashes, classes and modules.',
    outcomes: ['Write idiomatic Ruby', 'Use blocks and iterators', 'Work with arrays and hashes', 'Build classes and mixins'],
    lessons: [
      ['Basics', 'Hello Ruby', 'Ruby needs no semicolons or type declarations. `puts` prints a line. String interpolation uses `#{}` inside double quotes. Everything is an object, even numbers: `5.times`.', `course = "Ruby"
lessons = 5

puts "Welcome to #{course}!"
puts "#{lessons} lessons, #{lessons * 12} minutes"

3.times { |i| puts "Lesson #{i + 1}" }
puts 10.even?
puts "ruby".upcase.reverse`],
      ['Basics', 'Conditionals and methods', 'Methods are defined with `def ... end` and return the last expression automatically. Ruby has `if`, `unless`, `case/when` and statement modifiers like `puts "x" if ok`. Methods ending in `?` return booleans by convention.', `def grade(score)
  case score
  when 90.. then "A"
  when 75...90 then "B"
  else "C"
  end
end

def passed?(score) = score >= 60

[95, 80, 40].each do |s|
  puts "#{s}: #{grade(s)}"
  puts "  needs a retake" unless passed?(s)
end`],
      ['Collections', 'Arrays, hashes and blocks', 'Blocks (`{ }` or `do ... end`) are chunks of code passed to methods. Iterators like `each`, `map`, `select` and `reduce` take blocks. Hashes use symbol keys like `name:`.', `scores = [72, 95, 88, 61]
puts scores.select { |s| s > 70 }.inspect
puts scores.map { |s| s + 5 }.inspect
puts scores.sum / scores.size

student = { name: "Asha", skills: %w[ruby rails sql] }
puts student[:name]
student[:skills].each_with_index do |skill, i|
  puts "#{i + 1}. #{skill}"
end`],
      ['OOP', 'Classes and objects', 'Classes use `initialize` as the constructor and `@` for instance variables. `attr_reader` / `attr_accessor` generate getters and setters. `<` means inheritance.', `class Course
  attr_reader :title, :hours

  def initialize(title, hours)
    @title = title
    @hours = hours
  end

  def to_s = "#{title} (#{hours}h)"
end

class LiveCourse < Course
  def to_s = super + " LIVE"
end

puts Course.new("Ruby", 8)
puts LiveCourse.new("Rails", 12)`],
      ['OOP', 'Modules and mixins', 'Modules group methods and constants. `include` mixes a module\'s methods into a class, giving you shared behaviour without inheritance. Ruby\'s own `Comparable` and `Enumerable` work this way.', `module Rateable
  def rate(stars)
    (@ratings ||= []) << stars
    self
  end

  def average_rating
    return 0 if @ratings.nil?
    (@ratings.sum.to_f / @ratings.size).round(1)
  end
end

class Course
  include Rateable
  def initialize(title) = @title = title
end

c = Course.new("Ruby").rate(5).rate(4)
puts c.average_rating   # 4.5`],
    ],
    quiz: [
      ['How do you interpolate in a Ruby string?', ['${x}', '#{x}', '%x', '{{x}}'], 1, 'Use #{} inside double quotes.'],
      ['What does a Ruby method return without a return statement?', ['nil', 'The last evaluated expression', 'true', 'An error'], 1, 'Ruby has implicit returns.'],
      ['Instance variables start with…', ['$', '@', '@@', '&'], 1, '@ is instance, @@ is class, $ is global.'],
      ['How do you add a module\'s methods to a class?', ['extend only', 'include', 'import', 'require'], 1, 'include mixes in instance methods.'],
    ],
  },
]
