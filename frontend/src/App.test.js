import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dashboard redirect without crashing', () => {
  render(<App />);
  // The Navbar brand should exist after initial render (Router mounted)
  const brand = screen.getByText(/EduLearn/i);
  expect(brand).toBeInTheDocument();
});
