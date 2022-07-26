import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Layout } from './';

describe('Layout component', () => {
  it('does display <Header />', () => {
    render(<Layout />, { wrapper: BrowserRouter });
    expect(screen.getByTestId('main-header')).toBeInTheDocument();
  });
});
