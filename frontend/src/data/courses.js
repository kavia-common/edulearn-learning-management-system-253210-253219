export const courses = [
  {
    id: 'react-basics',
    title: 'React Basics',
    short: 'Learn components, props, state, and hooks.',
    description:
      'Master the fundamentals of React including JSX, components, props, state management, and hooks. Build interactive UIs with confidence.',
    image: '/assets/react.jpg',
    color: '#2563EB',
    lessons: [
      { id: 'l1', title: 'Introduction to React', type: 'text', content: 'React is a library for building UIs. In this lesson, you will learn JSX and component basics.' },
      { id: 'l2', title: 'Components and Props', type: 'text', content: 'Components let you split the UI into independent pieces. Props are arguments to components.' },
      { id: 'l3', title: 'State and Effects', type: 'text', content: 'State lets components remember information. Effects let you synchronize components with external systems.' },
      { id: 'l4', title: 'Building a Small App', type: 'text', content: 'Put everything together by building a small todo list app.' },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What is React primarily used for?',
        options: ['Managing databases', 'Building user interfaces', 'Server-side routing', 'Styling CSS'],
        answer: 1
      },
      {
        id: 'q2',
        question: 'Which hook is used for side effects?',
        options: ['useState', 'useMemo', 'useEffect', 'useRef'],
        answer: 2
      },
      {
        id: 'q3',
        question: 'Props are ____ into a component.',
        options: ['pushed', 'drilled', 'passed', 'bound'],
        answer: 2
      },
      {
        id: 'q4',
        question: 'State updates are ____.',
        options: ['synchronous', 'asynchronous', 'blocking', 'immutable'],
        answer: 1
      }
    ]
  },
  {
    id: 'js-fundamentals',
    title: 'JavaScript Fundamentals',
    short: 'Variables, functions, arrays, and objects.',
    description:
      'Understand the core of JavaScript: variables, types, functions, arrays, objects, and control structures. Build a solid foundation.',
    image: '/assets/js.jpg',
    color: '#7C3AED',
    lessons: [
      { id: 'l1', title: 'Variables and Types', type: 'text', content: 'Learn var, let, const and primitive vs reference types.' },
      { id: 'l2', title: 'Functions', type: 'text', content: 'Function declarations, expressions, and arrow functions.' },
      { id: 'l3', title: 'Arrays and Objects', type: 'text', content: 'Manipulate arrays and objects effectively.' }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Which keyword defines a block-scoped variable?',
        options: ['var', 'let', 'scope', 'block'],
        answer: 1
      },
      {
        id: 'q2',
        question: 'Objects are stored by ____.',
        options: ['value', 'reference', 'copy', 'pointer'],
        answer: 1
      },
      {
        id: 'q3',
        question: 'Which is an array method?',
        options: ['map', 'size', 'insert', 'collect'],
        answer: 0
      },
      {
        id: 'q4',
        question: 'Arrow functions ____ "this" from parent scope.',
        options: ['rebind', 'inherit', 'shadow', 'erase'],
        answer: 1
      }
    ]
  },
  {
    id: 'ui-design',
    title: 'UI Design Essentials',
    short: 'Typography, color, spacing and layout.',
    description:
      'Learn the fundamentals of UI design including typography, color theory, spacing, layout systems, and accessibility best practices.',
    image: '/assets/ui.jpg',
    color: '#14B8A6',
    lessons: [
      { id: 'l1', title: 'Color and Contrast', type: 'text', content: 'Choose accessible color palettes and understand contrast ratios.' },
      { id: 'l2', title: 'Typography', type: 'text', content: 'Select type scales and apply hierarchy with weight and size.' },
      { id: 'l3', title: 'Spacing and Layout', type: 'text', content: 'Use grids, spacing, and alignment for clean layouts.' },
      { id: 'l4', title: 'Accessible Components', type: 'text', content: 'Buttons, forms, and navigation with accessibility in mind.' }
    ],
    quiz: [
      {
        id: 'q1',
        question: 'Which helps define visual hierarchy?',
        options: ['Color and size', 'Speed and memory', 'CPU and GPU', 'RAM size'],
        answer: 0
      },
      {
        id: 'q2',
        question: 'Good contrast improves ____.',
        options: ['Battery life', 'Accessibility', 'SEO', 'Frame rate'],
        answer: 1
      },
      {
        id: 'q3',
        question: 'A grid system helps with ____.',
        options: ['Performance', 'Layout consistency', 'Browser caching', 'Animations'],
        answer: 1
      },
      {
        id: 'q4',
        question: 'Typography deals with ____.',
        options: ['Javascript', 'Database design', 'Fonts and text', 'Network calls'],
        answer: 2
      }
    ]
  }
];

export function getCourseById(id) {
  return courses.find(c => c.id === id);
}
