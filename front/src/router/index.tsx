import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Home } from '../Views/Home';
import { Layout } from '../Views/Layout';
import { paths } from './paths';

export const LIST_PATH = 'realtors';
export const MESSAGES_PATH = 'messages';

export const AppRoutes: FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path={paths.LIST}>
        <Route path=":realtorId" element={<Home />}>
          <Route path={paths.MESSAGES}>
            <Route path=":messageId" element={<Home />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/realtors" replace />} />
    </Route>
  </Routes>
);
