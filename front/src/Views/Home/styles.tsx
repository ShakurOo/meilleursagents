import MUIBox, { BoxProps } from '@mui/material/Box';
import MUIDrawer, { DrawerProps } from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';

import { HEADER_HEIGHT } from '../Layout/Header/styles';

const DRAWER_WIDTH = 500;

export const Drawer = styled(MUIDrawer)<DrawerProps>(() => ({
  //   height: `calc(100vh - ${HEADER_HEIGHT}px)`,
  display: 'flex',
  flexShrink: 0,
  width: DRAWER_WIDTH,

  '& .MuiDrawer-paper': {
    width: DRAWER_WIDTH,
    boxSizing: 'border-box',
    marginTop: HEADER_HEIGHT,
  },
}));

export const Wrapper = styled(MUIBox)<BoxProps>(() => ({
  //   height: `calc(100vh - ${HEADER_HEIGHT}px)`,
  display: 'flex',
}));
