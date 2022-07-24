import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { HEADER_HEIGHT } from '../../views/Layout/Header/styles';

export const Wrapper = styled(Box)<BoxProps>(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: `calc(100vh - ${HEADER_HEIGHT}px)`,

  '& > p': {
    marginTop: theme.spacing(2),
  },
}));
