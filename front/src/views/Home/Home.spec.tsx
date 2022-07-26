import { screen } from '@testing-library/react';

import { Paths } from '../../router/paths';
import { renderWithRouter } from '../../tests/utils';
import { Home } from './';

describe('Home component', () => {
  it('does match snapshots and styles', () => {
    renderWithRouter(<Home />, {
      history: {
        path: Paths.LIST_ID,
      },
    });
    expect(screen).toMatchSnapshot();
  });
});
