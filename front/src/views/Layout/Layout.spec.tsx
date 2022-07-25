import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Layout } from './';

describe('Layout component', () => {
  it('does match snapshots and styles', async () => {
    const { container } = render(<Layout />, { wrapper: BrowserRouter });
    expect(container).toMatchSnapshot();
  });

  it('does display <Header />', async () => {
    render(<Layout />, { wrapper: BrowserRouter });
    expect(screen.getByTestId('main-header')).toBeInTheDocument();
  });
});
