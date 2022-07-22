import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { ViewsProvider } from '../Views.context';
import { Header } from './Header';
import { Wrapper } from './styles';

export const Layout: FC = () => {
  return (
    <ViewsProvider>
      <Header />
      <Wrapper>
        <Outlet />
      </Wrapper>
    </ViewsProvider>
  );
};
