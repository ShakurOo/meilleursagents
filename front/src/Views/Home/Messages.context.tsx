import { Dispatch, FC, ReactNode, useEffect, useState } from 'react';
import { createContext } from 'react';

import { useAxios } from '../../hooks/useAxios';
// import { generatePath, useNavigate, useParams } from 'react-router-dom';
import type { Message } from '../../typings/messages';
// import { paths } from '../router/paths';

const INITIAL_MESSAGES_PAGE = 1;
const INITIAL_MESSAGES_PAGE_SIZE = 10;

const INITIAL_STATE = {
  messages: [],
  isFullLoaded: false,
  isLoading: false,
  setPage: () => {},
};

export interface MessagesContextProps {
  messages: Message[];
  isFullLoaded: boolean;
  isLoading: boolean;
  setPage: Dispatch<number>;
}
export const MessagesContext = createContext<MessagesContextProps>(INITIAL_STATE);

interface MessagesProviderProps {
  children: ReactNode;
  realtorId: string | undefined;
}
export const MessagesProvider: FC<MessagesProviderProps> = ({ children, realtorId }) => {
  // const routeParams = useParams();
  // const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(INITIAL_STATE.messages);
  const [page, setPage] = useState(INITIAL_MESSAGES_PAGE);

  const {
    data: dataMessages,
    loaded,
    setLoaded,
  } = useAxios<Message[]>(
    `realtors/${realtorId}/messages/?${new URLSearchParams({
      page: page.toString(),
      page_size: INITIAL_MESSAGES_PAGE_SIZE.toString(),
      sort: 'date:desc',
    })}`,
    'GET',
    {
      skip: !realtorId,
    },
  );

  useEffect(() => {
    if (dataMessages) {
      setMessages((currentMessages) => [...currentMessages, ...dataMessages]);
    }
  }, [dataMessages]);

  useEffect(() => {
    if (realtorId && (messages.length || page !== INITIAL_MESSAGES_PAGE)) {
      setLoaded(false);
      setMessages(INITIAL_STATE.messages);
      setPage(INITIAL_MESSAGES_PAGE);
    }
  }, [realtorId]);

  return (
    <MessagesContext.Provider
      value={{
        messages,
        isFullLoaded: !dataMessages?.length,
        isLoading: !loaded,
        setPage,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};
