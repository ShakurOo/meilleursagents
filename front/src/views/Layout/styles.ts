import { styled } from '@mui/material/styles';

import { HEADER_HEIGHT } from './Header/styles';

export const Wrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  height: `calc(100vh - ${HEADER_HEIGHT}px)`,
  overflow: 'hidden',
  position: 'relative',
  top: HEADER_HEIGHT,
}));
