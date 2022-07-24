import { Typography } from '@mui/material';
import { CircularProgress } from '@mui/material';
import type { FC } from 'react';

import { Wrapper } from './styles';

interface LoaderProps {
  message?: string;
}
export const Loader: FC<LoaderProps> = ({ message }) => (
  <Wrapper position="static">
    <CircularProgress />
    {!!message && <Typography color="primary">{message}</Typography>}
  </Wrapper>
);
