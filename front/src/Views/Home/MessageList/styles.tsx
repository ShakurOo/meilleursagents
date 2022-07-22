import MUIBox, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const Wrapper = styled(MUIBox)<BoxProps>(() => ({
  overflow: 'auto',
}));
