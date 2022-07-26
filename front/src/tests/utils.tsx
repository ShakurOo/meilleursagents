import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createMemoryHistory, Location } from 'history';
import type { ReactElement } from 'react';
import { act } from 'react-dom/test-utils';
import { Route, Router, Routes } from 'react-router-dom';

import { AppProvider } from '../App.context';
import { API_DOMAIN } from '../constants';
import { MessagesProvider } from '../views/Home/Messages.context';
import { REALTORS_LIST_MOCKS } from './mocks/realtors';

const axiosMock = new MockAdapter(axios);

export const close = async () => act(() => Promise.resolve());

// RENDERS
interface RouterParams {
  history?: {
    path: string;
    state?: Location['state'];
  };
  routePath?: string;
}
export const renderWithRouter = (ui: ReactElement, opts: RouterParams) => ({
  user: userEvent.setup(),
  ...render(ui, {
    wrapper: ({ children }) => {
      const history = createMemoryHistory();

      if (opts.history) {
        history.replace(opts.history.path, opts.history.state || {});
      }

      if (opts.routePath) {
        return (
          <Router location={history.location} navigator={history}>
            <Routes>
              <Route path={opts.routePath} element={children} />
            </Routes>
          </Router>
        );
      }

      return (
        <Router location={history.location} navigator={history}>
          {children}
        </Router>
      );
    },
  }),
});

export const renderWithAll = (ui: ReactElement, opts: RouterParams) => {
  const AppTree = (
    <AppProvider>
      <MessagesProvider>{ui}</MessagesProvider>
    </AppProvider>
  );
  return renderWithRouter(AppTree, opts);
};

// UTILS
export const changeRealtorAction = async (realtorIndex = 0) => {
  await waitFor(() => {
    expect(screen.getByTestId('realtors-select')).toBeInTheDocument();
  });

  const RealtorsSelect = screen.getByText(REALTORS_LIST_MOCKS[0].name);

  fireEvent.mouseDown(RealtorsSelect);

  await waitFor(() => {
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  const RealtorsSelectOptions = screen.getByRole('listbox');
  const RealtorsSelectOption = within(RealtorsSelectOptions).getByText(
    REALTORS_LIST_MOCKS[realtorIndex].name,
  );

  axiosMock
    .onGet(
      `${API_DOMAIN}/realtors/${REALTORS_LIST_MOCKS[
        realtorIndex
      ].id.toString()}/messages/?page=1&page_size=10&sort=date%3Adesc`,
    )
    .reply(200, []);

  fireEvent.click(RealtorsSelectOption);
};

export const openMessageAction = async (messageIndex = 0) => {
  await waitFor(() => {
    expect(screen.getAllByTestId('item-link').length).toBeGreaterThan(0);
  });

  const MessageButton = screen.getAllByTestId('item-link')[messageIndex];

  fireEvent.click(MessageButton);
};
