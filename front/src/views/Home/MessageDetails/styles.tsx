import MUIBox, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Link, LinkProps } from 'react-router-dom';

import { HEADER_HEIGHT } from '../../Layout/Header/styles';

const TITLE_SVG_HEIGHT = 50;

export const BackButton = styled(Link)<LinkProps>(({ theme }) => ({
  color: theme.palette.grey[900],
  display: 'block',
  marginBottom: theme.spacing(2.5),
  marginTop: theme.spacing(1),
  textDecoration: 'none',
}));

export const ExtraWrapper = styled('div')(({ theme }) => ({
  alignItems: 'center',
  color: theme.palette.grey[300],
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  textAlign: 'center',

  '& > span > svg': {
    fontSize: 72,
  },
}));

export const TitleWrapper = styled(MUIBox)<BoxProps & { read: boolean }>(
  ({ read, theme }) => ({
    alignItems: 'center',
    display: 'flex',

    '& > div': {
      width: TITLE_SVG_HEIGHT,

      '& > span > svg': {
        fill: !read ? theme.palette.grey[800] : theme.palette.grey[300],
        marginTop: theme.spacing(0.5),
        fontSize: 32,
      },
    },
  }),
);

export const WhiteWrapper = styled(MUIBox)<BoxProps>(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(3),
  padding: theme.spacing(3, 3, 2, 3),

  '& .body-wrapper': {
    marginTop: theme.spacing(6),
  },

  '& .date': {
    color: theme.palette.grey[500],
  },

  '& .head-list': {
    padding: `0 0 0 ${TITLE_SVG_HEIGHT}px`,

    '& > div': {
      flex: 'none',
      width: 110,
    },

    '& > a': {
      flex: '1 auto',
    },
  },
}));

export const Wrapper = styled(MUIBox)<BoxProps>(({ theme }) => ({
  boxSizing: 'border-box',
  flexGrow: 1,
  height: `calc(100vh - ${HEADER_HEIGHT}px)`,
  padding: theme.spacing(3),

  '& .title-from': {
    fontWeight: theme.typography.fontWeightBold,
  },
}));
