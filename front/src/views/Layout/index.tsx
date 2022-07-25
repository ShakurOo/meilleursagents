import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { AppProvider } from '../../App.context';
import { Header } from './Header';
import { Wrapper } from './styles';

export const Layout: FC = () => {
  return (
    <AppProvider>
      <Header />
      <Wrapper>
        <Outlet />
      </Wrapper>
    </AppProvider>
  );
};
