import { createTheme } from '@mui/material';
import { common } from '@mui/material/colors';

const MAIN_BLUE_COLOR = '#1432BE';
const MAIN_LIGHT_BLUE_COLOR = '#1E91FF';

export const MATheme = createTheme({
  palette: {
    primary: {
      main: MAIN_BLUE_COLOR,
      contrastText: common.white,
    },
    secondary: {
      main: MAIN_LIGHT_BLUE_COLOR,
      contrastText: common.white,
    },
  },
});
