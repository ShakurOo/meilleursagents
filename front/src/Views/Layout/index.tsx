import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from './Header';
import { Wrapper } from './styles';

export const Layout: FC = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <Outlet />
      </Wrapper>
    </>
  );
};
