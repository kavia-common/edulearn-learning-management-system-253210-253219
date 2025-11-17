# EduLearn LMS Frontend (React)

A lightweight, frontend-only LMS built with React, vanilla CSS and localStorage persistence. No admin panel, no backend calls.

## Features
- Auth (Login/Register) with basic validation and localStorage persistence
- Dashboard with Continue Learning, Completed, and Recommendations
- Courses listing and Course Details with lessons and progress
- Lesson Player with Mark Completed and Next/Previous
- Quiz module with MCQs, optional 10s per-question timer, and keyboard shortcuts (1-4)
- Results page with score details and attempts scoreboard
- Ocean Professional theme (blue/purple/teal) with smooth transitions
- Responsive layout (Navbar + Sidebar desktop, BottomNav mobile)

## Quick Start
- npm install
- npm start

## Project Structure
- src/components: Navbar, Sidebar, BottomNav, CourseCard, ProgressBar
- src/pages: Auth/Login, Auth/Register, Dashboard, Courses, CourseDetails, LessonPlayer, Quiz, Results
- src/data: Sample courses, lessons, and quizzes
- src/utils: storage.js (localStorage wrapper), theme.js (ThemeProvider)
- src/styles: theme.css, layout.css, transitions.css

## Assets
Place optional thumbnails in `public/assets/`:
- react.jpg, js.jpg, ui.jpg

## Environment
No backend required. Router uses in-browser navigation.

