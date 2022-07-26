import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { cleanupMedia, setMedia } from 'mock-match-media';

import { API_DOMAIN } from '../../../constants';
import { Paths } from '../../../router/paths';
import { REALTORS_LIST_MOCKS } from '../../../tests/mocks/realtors';
import { renderWithAll } from '../../../tests/utils';
import { MessageList } from './';
import { EMPTY_MESSAGE_LABEL } from './constants';

const axiosMock = new MockAdapter(axios);

jest.mock(
  'react-virtualized-auto-sizer',
  () =>
    ({ children }: any) =>
      children({ height: 720, width: 320 }),
);

describe('MessageList component', () => {
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
    render(<MessageList />);

    expect(screen).toMatchSnapshot();
  });

  it('does successively display Loader and "NO MESSAGE" label', async () => {
    setMedia({ width: '1980px' });

    renderWithAll(<MessageList />, {
      history: { path: `/${Paths.LIST}/101` },
      routePath: Paths.LIST_ID,
    });

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(EMPTY_MESSAGE_LABEL)).toBeInTheDocument();
    });
  });
});
