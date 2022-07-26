/* eslint-disable testing-library/no-wait-for-snapshot */
import { cleanup, render, screen, waitFor, within } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { cleanupMedia, setMedia } from 'mock-match-media';

import App from './App';
import { API_DOMAIN } from './constants';
import { Paths } from './router/paths';
import { MESSAGES_LIST_MOCKS } from './tests/mocks/messages';
import { REALTORS_LIST_MOCKS } from './tests/mocks/realtors';
import { changeRealtorAction, openMessageAction } from './tests/utils';
import { EMPTY_MESSAGE_LABEL } from './views/Home/MessageList/constants';

const axiosMock = new MockAdapter(axios);

// https://github.com/bvaughn/react-window/issues/454#issuecomment-646031139
jest.mock(
  'react-virtualized-auto-sizer',
  () =>
    ({ children }: any) =>
      children({ height: 720, width: 320 }),
);

describe('App component', () => {
  afterEach(() => {
    cleanup();
    window.history.replaceState(null, document.title, '/');
  });

  beforeAll(() => {
    cleanupMedia();
    axiosMock.reset();
    jest.spyOn(console, 'warn').mockImplementation(() => {}); // Shutdown useless InfiniteLoader ref warn
  });

  beforeEach(() => {
    axiosMock
      .onGet(`${API_DOMAIN}/realtors/`)
      .reply(200, REALTORS_LIST_MOCKS)
      .onGet(`${API_DOMAIN}/realtors/101/messages/?page=1&page_size=10&sort=date%3Adesc`)
      .reply(200, MESSAGES_LIST_MOCKS)
      .onPatch(`${API_DOMAIN}/realtors/101/messages/10200`)
      .reply(200, { ...MESSAGES_LIST_MOCKS[0], read: true });
  });

  it('does match snapshots and styles', async () => {
    render(<App />);
    await waitFor(() => expect(screen).toMatchSnapshot());
  });

  describe('Routing mechanism', () => {
    describe('Header', () => {
      it('does update route when realtor selection changes', async () => {
        setMedia({ width: '1980px' });
        render(<App />);
        const newRealtorIndex = 1;

        await changeRealtorAction(newRealtorIndex);

        // New message fetched
        await waitFor(() => {
          expect(screen.getByText(EMPTY_MESSAGE_LABEL)).toBeInTheDocument();
        });

        // Check path changes
        expect(window.location).toHaveProperty(
          'pathname',
          `/${Paths.LIST}/${REALTORS_LIST_MOCKS[newRealtorIndex].id.toString()}`,
        );
      });
    });

    describe('List', () => {
      describe('Read status', () => {
        it('does mark as read the appropriate message', async () => {
          setMedia({ width: '1980px' });
          render(<App />);
          await openMessageAction();

          await waitFor(() => {
            expect(screen.getAllByTestId('item-link')).toHaveLength(8);
          });
          await waitFor(() => {
            expect(screen.getAllByTestId('item-read')).toHaveLength(3);
          });
          await waitFor(() => {
            expect(screen.getAllByTestId('item-unread')).toHaveLength(5);
          });
        });

        it('does show appropriate icon depending on read status', async () => {
          setMedia({ width: '1980px' });
          render(<App />);
          await openMessageAction();

          await waitFor(() => {
            const DetailsContainer = screen.getByTestId('list-view-wrapper');
            expect(
              within(DetailsContainer).getAllByTestId('icon-enabled')[0],
            ).toBeInTheDocument();
          });

          await waitFor(() => {
            const DetailsContainer = screen.getByTestId('details-view-wrapper');
            expect(
              within(DetailsContainer).getAllByTestId('icon-disabled')[0],
            ).toBeInTheDocument();
          });
        });
      });

      describe('Small viewport', () => {
        it('does display <List /> as fullscreen', async () => {
          setMedia({ width: '320px' });
          render(<App />);

          await waitFor(() => {
            expect(screen.getByTestId('list-view-wrapper')).toBeInTheDocument();
          });
          await waitFor(() => {
            expect(screen.queryByTestId('details-view-wrapper')).not.toBeInTheDocument();
          });
        });
      });

      describe('Large viewport', () => {
        it('does display <List /> and <Details />', async () => {
          setMedia({ width: '1980px' });
          render(<App />);

          await waitFor(() => {
            expect(screen.getByTestId('list-view-wrapper')).toBeInTheDocument();
          });
          await waitFor(() => {
            expect(screen.getByTestId('details-view-wrapper')).toBeInTheDocument();
          });
        });
      });
    });

    describe('Details', () => {
      describe('Read status', () => {
        it('does show appropriate icon depending on message read status', async () => {
          setMedia({ width: '1980px' });
          render(<App />);

          await openMessageAction();

          await waitFor(() => {
            const DetailsContainer = screen.getByTestId('details-view-wrapper');
            expect(
              within(DetailsContainer).getByTestId('icon-enabled'),
            ).toBeInTheDocument();
          });

          await waitFor(() => {
            const DetailsContainer = screen.getByTestId('details-view-wrapper');
            expect(
              within(DetailsContainer).getByTestId('icon-disabled'),
            ).toBeInTheDocument();
          });
        });
      });

      describe('Small viewport', () => {
        it('does display <Details /> as fullscreen', async () => {
          setMedia({ width: '320px' });
          render(<App />);

          await openMessageAction();

          await waitFor(() => {
            expect(screen.getByTestId('details-view-wrapper')).toBeInTheDocument();
          });
          await waitFor(() => {
            expect(screen.queryByTestId('list-view-wrapper')).not.toBeInTheDocument();
          });
        });
      });

      describe('Large viewport', () => {
        it('does display <List /> and <Details />', async () => {
          setMedia({ width: '1980px' });
          render(<App />);

          await openMessageAction();

          await waitFor(() => {
            expect(screen.getByTestId('list-view-wrapper')).toBeInTheDocument();
          });
          await waitFor(() => {
            expect(screen.getByTestId('details-view-wrapper')).toBeInTheDocument();
          });
        });
      });
    });
  });
});
