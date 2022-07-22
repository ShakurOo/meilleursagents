import MUIBox, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const Wrapper = styled(MUIBox)<BoxProps>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));
