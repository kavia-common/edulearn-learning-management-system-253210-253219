import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './index.css';
import './styles/theme.css';
import './styles/layout.css';
import './styles/transitions.css';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';

// Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import LessonPlayer from './pages/LessonPlayer';
import Quiz from './pages/Quiz';
import Results from './pages/Results';

// Utils
import { storage } from './utils/storage';
import { ThemeProvider } from './utils/theme';

// PUBLIC_INTERFACE
function RequireAuth({ children }) {
  /** Ensures a user is logged in, otherwise redirects to /login. */
  const user = storage.getUser();
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}

// PUBLIC_INTERFACE
function AppShell({ children }) {
  /** Layout shell with top navbar, sidebar/BottomNav and content area. */
  const location = useLocation();
  const authRoute = location.pathname.startsWith('/login') || location.pathname.startsWith('/register');
  if (authRoute) {
    return <main className="auth-container fade-in">{children}</main>;
  }
  return (
    <div className="app-shell">
      <Navbar />
      <div className="app-body">
        <Sidebar />
        <main className="content fade-in" role="main" aria-live="polite">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  /** Root application component configuring router and theme provider. */
  return (
    <ThemeProvider>
      <Router>
        <AppShell>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/dashboard" element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            } />
            <Route path="/courses" element={
              <RequireAuth>
                <Courses />
              </RequireAuth>
            } />
            <Route path="/courses/:courseId" element={
              <RequireAuth>
                <CourseDetails />
              </RequireAuth>
            } />
            <Route path="/courses/:courseId/lesson/:lessonId" element={
              <RequireAuth>
                <LessonPlayer />
              </RequireAuth>
            } />
            <Route path="/courses/:courseId/quiz" element={
              <RequireAuth>
                <Quiz />
              </RequireAuth>
            } />
            <Route path="/results" element={
              <RequireAuth>
                <Results />
              </RequireAuth>
            } />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AppShell>
      </Router>
    </ThemeProvider>
  );
}

export default App;
