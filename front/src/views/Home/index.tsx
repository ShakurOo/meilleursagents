import { Box, useMediaQuery, useTheme } from '@mui/material';
import type { FC } from 'react';
import { matchPath, useLocation } from 'react-router-dom';

import { Paths } from '../../router/paths';
import { MessageDetails } from './MessageDetails';
import { MessageList } from './MessageList';
import { MessagesProvider } from './Messages.context';
import { Drawer, Wrapper } from './styles';

export const Home: FC = () => {
  const theme = useTheme();
  const location = useLocation();

  const isListView = !!matchPath(Paths.LIST_ID, location.pathname);

  const isLargeViewport = useMediaQuery(theme.breakpoints.up('md'));
  const isSmallViewport = useMediaQuery(theme.breakpoints.down('md'));

  const showList = !!(isLargeViewport || (isListView && isSmallViewport));
  const showDetails = !!(isLargeViewport || (!isListView && isSmallViewport));

  return (
    <Wrapper>
      <MessagesProvider>
        {showList && (
          <Box data-testid="list-view-wrapper" component="aside">
            <Drawer variant="permanent">
              <MessageList />
            </Drawer>
          </Box>
        )}

        {showDetails && (
          <Box data-testid="details-view-wrapper" component="main">
            <MessageDetails />
          </Box>
        )}
      </MessagesProvider>
    </Wrapper>
  );
};
