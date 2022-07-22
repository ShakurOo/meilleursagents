import type { FC } from 'react';

import { MessageDetails } from './MessageDetails';
import { MessageList } from './MessageList';
import { Drawer, Wrapper } from './styles';

export const Home: FC = () => {
  return (
    <Wrapper>
      <Drawer variant="permanent">
        <MessageList />
      </Drawer>

      <MessageDetails />
    </Wrapper>
  );
};
