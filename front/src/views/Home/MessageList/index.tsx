import { Typography } from '@mui/material';
import type { FC } from 'react';
import { useCallback, useContext, useEffect, useRef } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import { Loader } from '../../../components';
import { MessagesContext } from '../Messages.context';
import { EMPTY_MESSAGE_LABEL } from './constants';
import { Item } from './Item';
import { MAX_ITEM_HEIGHT } from './Item/styles';
import { ExtraWrapper, Wrapper } from './styles';

export const MessageList: FC = () => {
  const listRef = useRef<List | null>(null);
  const sizeMap = useRef<{ [key: number]: number } | null>(null);
  const { activeMessage, isLoading, isFullLoaded, messages, setPage } =
    useContext(MessagesContext);

  const handleLoadMoreItems = useCallback(() => {
    if (isLoading) {
      return;
    }

    setPage((currentPage: number) => currentPage + 1);
  }, [isLoading]);

  const itemCount = messages.length ? messages.length + 1 : 0;

  const isItemLoaded = (index: number) => isFullLoaded || index < messages.length;

  const getItemSize = (index: number) => sizeMap.current?.[index] || MAX_ITEM_HEIGHT;

  const setItemSize = useCallback((index: number, size: number) => {
    listRef.current?.resetAfterIndex(0);
    sizeMap.current = { ...sizeMap.current, [index]: size };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const activeMessageIndex = messages.findIndex(({ id }) => id === activeMessage?.id);
      setTimeout(() => {
        listRef.current?.scrollToItem(activeMessageIndex, 'start');
      }, 0);
    }
  }, [isLoading]);

  if (isLoading) {
    return <Loader />;
  } else if (!messages.length) {
    return (
      <ExtraWrapper>
        <Typography color="disabled">{EMPTY_MESSAGE_LABEL}</Typography>
      </ExtraWrapper>
    );
  }

  return (
    <Wrapper data-testid="list-view">
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={handleLoadMoreItems}
        threshold={1}
      >
        {({ onItemsRendered, ref }) => (
          <AutoSizer>
            {({ width, height }) => (
              <List
                className="list"
                height={height}
                estimatedItemSize={141}
                itemCount={itemCount}
                itemSize={getItemSize}
                onItemsRendered={onItemsRendered}
                ref={(list: List) => {
                  ref(list);
                  listRef.current = list;
                }}
                width={width}
              >
                {({ index, style }) => (
                  <div style={style}>
                    <Item index={index} setItemSize={setItemSize} />
                  </div>
                )}
              </List>
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    </Wrapper>
  );
};
