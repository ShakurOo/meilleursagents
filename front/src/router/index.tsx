import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Home } from '../views/Home';
import { Layout } from '../views/Layout';
import { Paths } from './paths';

export const AppRoutes: FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path={Paths.LIST}>
        <Route path=":realtorId" element={<Home />}>
          <Route path={Paths.MESSAGES}>
            <Route path=":messageId" element={<Home />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/realtors" replace />} />
    </Route>
  </Routes>
);
