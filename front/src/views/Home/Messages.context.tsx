import { Dispatch, FC, ReactNode, useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';

import { AppContext } from '../../App.context';
import { useAxios, usePrevious } from '../../hooks';
import { Paths } from '../../router/paths';
import type { Message } from '../../types/message';
import { Realtor } from '../../types/realtor';
import { getMessageAsReadPayload } from './utils';

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
  setPage: Dispatch<(pages: number) => number>;
}
export const MessagesContext = createContext<MessagesContextProps>(INITIAL_STATE);

interface MessagesProviderProps {
  children: ReactNode;
}
export const MessagesProvider: FC<MessagesProviderProps> = ({ children }) => {
  const { setActiveRealtor } = useContext(AppContext);

  const routeParams = useParams();
  const previousRouteParams = usePrevious(routeParams);
  const navigate = useNavigate();

  const [activeMessage, setActiveMessage] = useState<Message | null>(
    INITIAL_STATE.activeMessage,
  );

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_STATE.messages);
  const [page, setPage] = useState(INITIAL_MESSAGES_PAGE);

  // Fetch messages
  const {
    data: dataMessages,
    loaded: dataMessagesLoaded,
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

  // Update message
  const { data: dataUpdatedMessage } = useAxios<Message>(
    `realtors/${routeParams.realtorId}/messages/${activeMessage?.id}`,
    'PATCH',
    {
      payload: getMessageAsReadPayload(activeMessage),
      skip: !activeMessage?.id || activeMessage.read,
    },
  );

  /**
   * We populating internal messages states
   */
  useEffect(() => {
    if (dataMessages) {
      setMessages((currentMessages) => [...currentMessages, ...dataMessages]);
    }
  }, [dataMessages]);

  /**
   * We resetting everything when realtor changes
   */
  useEffect(() => {
    if (
      routeParams.realtorId &&
      routeParams.realtorId !== previousRouteParams?.realtorId &&
      (messages.length || page !== INITIAL_MESSAGES_PAGE)
    ) {
      setActiveMessage(null);
      setLoaded(false);
      setMessages(INITIAL_STATE.messages);
      setPage(INITIAL_MESSAGES_PAGE);
    }
  }, [routeParams.realtorId]);

  /**
   * We retrieving message data from url
   */
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
          setIsLoading(false);

          setTimeout(() => {
            const newPath = generatePath(Paths.LIST_ID, routeParams);
            navigate(newPath, { replace: true });
          }, 0);
          return;
        }

        setIsLoading((currentIsLoading) => currentIsLoading || true);

        // [Otherwise] we attempting to load next pages sucessively
        setPage((currentPage) => currentPage + 1);
        return;
      }

      // [Otherwise] we uses the message corresponding as active message
      setActiveMessage(activeMessage);
      setIsLoading(false);
    }
  }, [dataMessages, routeParams]);

  /**
   * We updating internal messages states to refresh the view and decrement unread messages counter
   */
  useEffect(() => {
    if (dataUpdatedMessage) {
      setActiveMessage(dataUpdatedMessage);
      setMessages((currentMessages) =>
        currentMessages.map((message) =>
          message.id === dataUpdatedMessage.id ? dataUpdatedMessage : message,
        ),
      );

      setActiveRealtor?.((currentActiveRealtor: Realtor) => ({
        ...currentActiveRealtor,
        unread_messages:
          currentActiveRealtor?.unread_messages > 1
            ? currentActiveRealtor?.unread_messages - 1
            : 0,
      }));
    }
  }, [dataUpdatedMessage]);

  return (
    <MessagesContext.Provider
      value={{
        activeMessage,
        messages,
        isFullLoaded: !dataMessages?.length,
        isLoading: isLoading || !dataMessagesLoaded,
        setPage,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};
