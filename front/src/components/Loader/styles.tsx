import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { HEADER_HEIGHT } from '../../Views/Layout/Header/styles';

export const Wrapper = styled(Box)<BoxProps>(() => ({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  height: `calc(100vh - ${HEADER_HEIGHT}px)`,
}));
