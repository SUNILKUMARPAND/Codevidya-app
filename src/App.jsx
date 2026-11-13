import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import Toast from './components/Toast.jsx'
import Certificate from './pages/Certificate.jsx'
import CourseDetail from './pages/CourseDetail.jsx'
import CourseDocs from './pages/CourseDocs.jsx'
import Courses from './pages/Courses.jsx'
import Dashboard from './pages/Dashboard.jsx'
import DocsLibrary from './pages/DocsLibrary.jsx'
import Home from './pages/Home.jsx'
import Lesson from './pages/Lesson.jsx'
import NotFound from './pages/NotFound.jsx'
import Paths from './pages/Paths.jsx'
import Playground from './pages/Playground.jsx'
import Quiz from './pages/Quiz.jsx'

export default function App() {
  const { pathname, hash } = useLocation()

  // New page: jump to the #section if the link has one, otherwise to the top
  useEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (target) {
        target.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <div className="app">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={<CourseDetail />} />
          <Route path="/learn/:courseId/:lessonId" element={<Lesson />} />
          <Route path="/quiz/:courseId" element={<Quiz />} />
          <Route path="/certificate/:courseId" element={<Certificate />} />
          <Route path="/docs" element={<DocsLibrary />} />
          <Route path="/docs/:courseId" element={<CourseDocs />} />
          <Route path="/paths" element={<Paths />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Toast />
    </div>
  )
}
