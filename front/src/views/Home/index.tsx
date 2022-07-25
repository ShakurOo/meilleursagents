import { Box, useMediaQuery, useTheme } from '@mui/material';
import type { FC } from 'react';
import { matchPath, useLocation } from 'react-router-dom';

import { paths } from '../../router/paths';
import { MessageDetails } from './MessageDetails';
import { MessageList } from './MessageList';
import { MessagesProvider } from './Messages.context';
import { Drawer, Wrapper } from './styles';

export const Home: FC = () => {
  const theme = useTheme();
  const location = useLocation();

  const isListView = matchPath(paths.LIST_ID, location.pathname);
  const isLargeViewport = useMediaQuery(theme.breakpoints.up('md'));
  const isSmallViewport = useMediaQuery(theme.breakpoints.down('md'));

  const showDetails = !!(isLargeViewport || (isListView && isSmallViewport));
  const showList = !!(isLargeViewport || (!isListView && isSmallViewport));

  return (
    <Wrapper>
      <MessagesProvider>
        {showDetails && (
          <Drawer islistview={isListView ? 1 : 0} variant="permanent">
            <MessageList />
          </Drawer>
        )}

        {showList && (
          <Box component="main">
            <MessageDetails />
          </Box>
        )}
      </MessagesProvider>
    </Wrapper>
  );
};
