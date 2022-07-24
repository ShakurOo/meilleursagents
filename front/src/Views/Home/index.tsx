import type { FC } from 'react';

import { MessageDetails } from './MessageDetails';
import { MessageList } from './MessageList';
import { MessagesProvider } from './Messages.context';
import { Drawer, Wrapper } from './styles';

export const Home: FC = () => (
  <Wrapper>
    <MessagesProvider>
      <Drawer variant="permanent">
        <MessageList />
      </Drawer>

      <MessageDetails />
    </MessagesProvider>
  </Wrapper>
);
