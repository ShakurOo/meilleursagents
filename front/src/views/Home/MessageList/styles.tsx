import MUIBox, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { HEADER_HEIGHT } from '../../Layout/Header/styles';

export const ExtraWrapper = styled('div')(({ theme }) => ({
  alignItems: 'center',
  color: theme.palette.grey[300],
  display: 'flex',
  height: `calc(100vh - ${HEADER_HEIGHT}px)`,
  justifyContent: 'center',
  textAlign: 'center',
}));

export const Wrapper = styled(MUIBox)<BoxProps>(() => ({
  height: `calc(100vh - ${HEADER_HEIGHT}px)`,
  overflow: 'hidden',
}));
