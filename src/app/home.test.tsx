import { render, screen } from '@testing-library/react';
import Home from './page';
import '@testing-library/jest-dom';

describe('Home', () => {
  it('renders the title', () => {
    render(<Home />);
    expect(screen.getByRole('heading')).toHaveTextContent('Hello World');
  });
});
