import { CircularProgress } from '@mui/material';
import type { FC } from 'react';

import { Wrapper } from './styles';

export const Loader: FC = () => (
  <Wrapper position="static">
    <CircularProgress />
  </Wrapper>
);
