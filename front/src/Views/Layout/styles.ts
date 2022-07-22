import { styled } from '@mui/material/styles';

import { HEADER_HEIGHT } from './Header/styles';

export const Wrapper = styled('div')(() => ({
  height: `calc(100vh - ${HEADER_HEIGHT}px)`,
  position: 'relative',
  top: HEADER_HEIGHT,
}));
