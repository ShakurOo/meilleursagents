/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { API_DOMAIN } from '../../../constants';
import { Paths } from '../../../router/paths';
import { MESSAGES_LIST_MOCKS } from '../../../tests/mocks/messages';
import { REALTORS_LIST_MOCKS } from '../../../tests/mocks/realtors';
import { renderWithAll } from '../../../tests/utils';
import { Header } from './';

const axiosMock = new MockAdapter(axios);

describe('Header component', () => {
  afterEach(() => {
    cleanup();
    window.history.replaceState(null, document.title, '/');
  });

  beforeAll(() => {
    axiosMock.reset();
    jest.spyOn(console, 'warn').mockImplementation(() => {}); // Shutdown useless InfiniteLoader ref warn
  });

  beforeEach(() => {
    axiosMock
      .onGet(`${API_DOMAIN}/realtors/`)
      .reply(200, REALTORS_LIST_MOCKS)
      .onGet(`${API_DOMAIN}/realtors/101/messages/?page=1&page_size=10&sort=date%3Adesc`)
      .reply(200, MESSAGES_LIST_MOCKS);
  });

  it('does match snapshots and styles', () => {
    render(<header />);
    expect(screen).toMatchSnapshot();
  });

  it('does show loading icons when realtors are fetching', async () => {
    renderWithAll(<Header />, {
      history: { path: `/${Paths.LIST}/101` },
      routePath: Paths.LIST_ID,
    });

    await waitFor(() => {
      expect(screen.getByText('...')).toBeInTheDocument();
      expect(
        screen.queryByText(REALTORS_LIST_MOCKS[0].unread_messages),
      ).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.queryByText('...')).not.toBeInTheDocument();
      expect(
        screen.getByText(REALTORS_LIST_MOCKS[0].unread_messages),
      ).toBeInTheDocument();
    });
  });
});
