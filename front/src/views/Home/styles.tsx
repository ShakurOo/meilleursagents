import MUIBox, { BoxProps } from '@mui/material/Box';
import MUIDrawer, { DrawerProps } from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';

import { HEADER_HEIGHT } from '../Layout/Header/styles';

const DRAWER_WIDTH = 500;

export const Drawer = styled(MUIDrawer)<DrawerProps>(({ theme }) => ({
  display: 'flex',
  flexShrink: 0,
  width: DRAWER_WIDTH,

  [theme.breakpoints.down('md')]: {
    width: '100%',
  },

  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    marginTop: HEADER_HEIGHT,
    width: DRAWER_WIDTH,

    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
}));

export const Wrapper = styled(MUIBox)<BoxProps>(() => ({
  display: 'flex',

  '& main': {
    overflowY: 'auto',
    width: '100%',
  },
}));
