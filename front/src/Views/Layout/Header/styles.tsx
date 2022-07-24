import AppBar, { AppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';

export const HEADER_HEIGHT = 72;
export const LOGO_WIDTH = 125;

export const Wrapper = styled(AppBar)<AppBarProps>(({ theme }) => ({
  height: HEADER_HEIGHT,
  backgroundColor: theme.palette.common.white,
  zIndex: theme.zIndex.drawer + 1,
}));

export const WrapperActions = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  alignItems: 'center',
  display: 'flex',
  flex: '1 auto',
  justifyContent: 'flex-end',
  padding: theme.spacing(2),

  '& > .realtors-select': {
    marginLeft: theme.spacing(2),
    maxWidth: 200,
    minWidth: 150,
  },

  '& > .unread-counter': {
    boxShadow: 'none',
  },
}));

export const WrapperLogo = styled('div')(() => ({
  width: LOGO_WIDTH,
}));
