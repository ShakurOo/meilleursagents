import { FC, LegacyRef, useCallback, useContext, useRef } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import { Loader } from '../../../components';
import { MessagesContext } from '../Messages.context';
import { Item } from './Item';
import { MAX_ITEM_HEIGHT } from './Item/styles';
import { Wrapper } from './styles';

export const MessageList: FC = () => {
  const listRef = useRef<List | null>(null);
  const sizeMap = useRef<{ [key: number]: number } | null>(null);
  const { isLoading, isFullLoaded, messages, setPage } = useContext(MessagesContext);

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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Wrapper>
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
