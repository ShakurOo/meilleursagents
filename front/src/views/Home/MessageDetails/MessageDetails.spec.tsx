import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { cleanupMedia, setMedia } from 'mock-match-media';

import { API_DOMAIN } from '../../../constants';
import { Paths } from '../../../router/paths';
import { REALTORS_LIST_MOCKS } from '../../../tests/mocks/realtors';
import { renderWithAll } from '../../../tests/utils';
import { MessageDetails } from '.';

const axiosMock = new MockAdapter(axios);

jest.mock(
  'react-virtualized-auto-sizer',
  () =>
    ({ children }: any) =>
      children({ height: 720, width: 320 }),
);

describe('MessageDetails component', () => {
  beforeAll(() => {
    cleanupMedia();
    axiosMock.reset();
  });

  beforeEach(() => {
    axiosMock
      .onGet(`${API_DOMAIN}/realtors/`)
      .reply(200, REALTORS_LIST_MOCKS)
      .onGet(`${API_DOMAIN}/realtors/101/messages/?page=1&page_size=10&sort=date%3Adesc`)
      .reply(200, []);
  });

  it('does match snapshots and styles', () => {
    setMedia({ width: '1980px' });
    render(<MessageDetails />);

    expect(screen).toMatchSnapshot();
  });

  it('does successively display Loader and empty icon', async () => {
    setMedia({ width: '1980px' });
    renderWithAll(<MessageDetails />, {
      history: { path: `/${Paths.LIST}/101/${Paths.MESSAGES}/9999/` },
      routePath: `${Paths.LIST_ID}/${Paths.MESSAGES_ID}`,
    });

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('icon-empty')).toBeInTheDocument();
    });
  });
});
