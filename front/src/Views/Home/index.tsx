import type { FC } from 'react';
import { useContext } from 'react';

import { ViewsContext } from '../Views.context';
import { MessageDetails } from './MessageDetails';
import { MessageList } from './MessageList';
import { MessagesProvider } from './Messages.context';
import { Drawer, Wrapper } from './styles';

export const Home: FC = () => {
  const { activeRealtor } = useContext(ViewsContext);

  return (
    <Wrapper>
      <MessagesProvider realtorId={activeRealtor?.id}>
        <Drawer variant="permanent">
          <MessageList />
        </Drawer>

        <MessageDetails />
      </MessagesProvider>
    </Wrapper>
  );
};
