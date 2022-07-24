import { Dispatch, FC, ReactNode, useEffect, useState } from 'react';
import { createContext } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';

import { useAxios } from '../../hooks/useAxios';
import { paths } from '../../router/paths';
// import { generatePath, useNavigate, useParams } from 'react-router-dom';
import type { Message } from '../../typings/messages';
// import { paths } from '../router/paths';

const INITIAL_MESSAGES_PAGE = 1;
const INITIAL_MESSAGES_PAGE_SIZE = 10;

const INITIAL_STATE = {
  activeMessage: null,
  messages: [],
  isFullLoaded: false,
  isLoading: false,
  setPage: () => {},
};

export interface MessagesContextProps {
  activeMessage: Message | null;
  messages: Message[];
  isFullLoaded: boolean;
  isLoading: boolean;
  setPage: Dispatch<number>;
}
export const MessagesContext = createContext<MessagesContextProps>(INITIAL_STATE);

interface MessagesProviderProps {
  children: ReactNode;
}
export const MessagesProvider: FC<MessagesProviderProps> = ({ children }) => {
  const routeParams = useParams();
  const navigate = useNavigate();

  const [activeMessage, setActiveMessage] = useState<Message | null>(
    INITIAL_STATE.activeMessage,
  );
  const [messages, setMessages] = useState<Message[]>(INITIAL_STATE.messages);
  const [page, setPage] = useState(INITIAL_MESSAGES_PAGE);

  const {
    data: dataMessages,
    loaded,
    setLoaded,
  } = useAxios<Message[]>(
    `realtors/${routeParams.realtorId}/messages/?${new URLSearchParams({
      page: page.toString(),
      page_size: INITIAL_MESSAGES_PAGE_SIZE.toString(),
      sort: 'date:desc',
    })}`,
    'GET',
    {
      skip: !routeParams.realtorId,
    },
  );

  useEffect(() => {
    if (dataMessages) {
      setMessages((currentMessages) => [...currentMessages, ...dataMessages]);
    }
  }, [dataMessages]);

  useEffect(() => {
    if (routeParams.realtorId && (messages.length || page !== INITIAL_MESSAGES_PAGE)) {
      setActiveMessage(null);
      setLoaded(false);
      setMessages(INITIAL_STATE.messages);
      setPage(INITIAL_MESSAGES_PAGE);
    }
  }, [routeParams.realtorId]);

  useEffect(() => {
    if (routeParams?.messageId) {
      const activeMessage = messages.find(
        ({ id }) => id === Number(routeParams.messageId),
      );

      // [If] there is no correspondence with route messageId param ...
      if (!activeMessage) {
        // [If] there is no more messages provided by API ...
        if (Array.isArray(dataMessages) && !dataMessages.length) {
          // [Then] we redirects the user to the listing view
          const newPath = generatePath(paths.LIST_ID, routeParams);
          navigate(newPath, { replace: true });
          return;
        }

        setPage((currentPage) => currentPage + 1);
        return;
      }

      // [Then] we uses the message corresponding as active message
      setActiveMessage(activeMessage);
    }
  }, [dataMessages, routeParams]);

  return (
    <MessagesContext.Provider
      value={{
        activeMessage,
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
