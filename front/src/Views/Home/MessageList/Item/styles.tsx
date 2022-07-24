import MUIBox, { BoxProps } from '@mui/material/Box';
import MUIListItem, { ListItemProps } from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';

import { HEADER_HEIGHT } from '../../../Layout/Header/styles';

export const MAX_ITEM_HEIGHT = 141;

export const Wrapper = styled(MUIBox)<BoxProps>(() => ({
  height: `calc(100vh - ${HEADER_HEIGHT}px)`,
  overflow: 'auto',
}));

export const ListWrapper = styled(MUIListItem)<ListItemProps & { read: number }>(
  ({ read, theme }) => ({
    filter: read ? 'grayscale(1)' : 'grayscale(0)',
    maxHeight: MAX_ITEM_HEIGHT,

    '.item-link': {
      color: 'inherit',
      textDecoration: 'none',
      width: '100%',

      '.item-button': {
        padding: theme.spacing(1.5, 2),

        '& svg': {
          margin: theme.spacing(0.5, 0, 0, 1.5),
          opacity: read ? 0.35 : 1,
        },

        '& .title-text': {
          color: read ? theme.palette.grey[600] : 'inherit',
        },

        '& .body-text': {
          color: read ? theme.palette.grey[600] : theme.palette.common.black,

          '& > span:nth-of-type(n+2)': {
            color: theme.palette.grey[600],

            '@supports (-webkit-line-clamp: 2)': {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'initial',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
            },
          },
        },
      },
    },
  }),
);

export const ListExtraWrapper = styled('div')(({ theme }) => ({
  alignItems: 'center',
  color: theme.palette.grey[500],
  display: 'flex',
  height: MAX_ITEM_HEIGHT,
  justifyContent: 'center',
  textAlign: 'center',
}));

export const TitleWrapper = styled('span')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',

  '& > span:first-of-type': {
    flex: '1 auto',
    fontWeight: theme.typography.fontWeightBold,

    '&  p': {
      marginLeft: theme.spacing(0.75),
    },
  },
}));
