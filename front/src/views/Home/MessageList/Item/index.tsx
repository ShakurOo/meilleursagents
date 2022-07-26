import {
  Box,
  CircularProgress,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { formatRelative } from 'date-fns';
import type { FC } from 'react';
import { Fragment, memo, useContext, useEffect, useMemo, useRef } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { areEqual } from 'react-window';

import { DATE_FNS_LOCALE } from '../../../../constants';
import { Paths } from '../../../../router/paths';
import { MessageType } from '../../../../types/messages';
import { capitalize } from '../../../../utils/string';
import { MessagesContext } from '../../Messages.context';
import { getMessageFrom, getMessageIcon } from '../../utils';
import { END_OF_MESSAGES_TEXT, MESSAGE_TITLE_SUFFIX } from './constants';
import { ListExtraWrapper, ListWrapper, TitleWrapper } from './styles';

interface ItemProps {
  index: number;
  setItemSize: (index: number, size: number) => void;
}
export const Item: FC<ItemProps> = memo(({ index, setItemSize }) => {
  const { activeMessage, messages, isFullLoaded } = useContext(MessagesContext);
  const itemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (itemRef.current) {
      setItemSize(index, itemRef.current.clientHeight);
    }
  }, [itemRef]);

  // Extra item to show loading icon or "End of items" text
  if (!messages[index]) {
    return (
      <ListExtraWrapper ref={itemRef}>
        {!isFullLoaded ? (
          <CircularProgress size={32} />
        ) : (
          <Typography>{END_OF_MESSAGES_TEXT}</Typography>
        )}
      </ListExtraWrapper>
    );
  }

  const { body, contact, date, id, read, type, subject } = messages[index];
  const isActive = activeMessage?.id === id;

  const caption = useMemo(() => {
    switch (type) {
      case MessageType.EMAIL:
        return `Email ${MESSAGE_TITLE_SUFFIX}`;
      case MessageType.PHONE:
        return `Message ${MESSAGE_TITLE_SUFFIX}`;
      case MessageType.SMS:
        return `SMS ${MESSAGE_TITLE_SUFFIX}`;
    }
  }, [type]);

  const from = useMemo(
    () => (
      <Box alignItems="center" display="flex">
        {getMessageFrom({ contact, type })}
        {type === MessageType.PHONE && <Typography>({contact.phone})</Typography>}
      </Box>
    ),
    [contact, type],
  );

  const labelizedDate: string = useMemo(
    () =>
      capitalize(
        formatRelative(new Date(date), new Date(), {
          locale: DATE_FNS_LOCALE,
          weekStartsOn: 1,
        }),
      ),
    [date],
  );

  const Icon = useMemo(
    () => (
      <Box component="span" data-testid={read ? 'icon-disabled' : 'icon-enabled'}>
        {getMessageIcon({ read, type })}
      </Box>
    ),
    [read, type],
  );

  return (
    <Box ref={itemRef}>
      <ListWrapper
        data-testid={`item-${read ? 'read' : 'unread'}`}
        disablePadding
        id={id.toString()}
        isactive={isActive ? 1 : 0}
        read={read ? 1 : 0}
      >
        <Link
          className="item-link"
          data-testid="item-link"
          to={generatePath(Paths.MESSAGES_ID, { messageId: id.toString() })}
        >
          <ListItemButton alignItems="flex-start" className="item-button">
            <ListItemIcon>{Icon}</ListItemIcon>
            <ListItemText
              classes={{
                primary: 'title-text',
                secondary: 'body-text',
              }}
              primary={
                <TitleWrapper>
                  <Typography component="span" variant="h6">
                    {from}
                  </Typography>

                  <Typography
                    component="span"
                    variant="body2"
                    {...(!read && { color: 'primary' })}
                  >
                    {labelizedDate}
                  </Typography>
                </TitleWrapper>
              }
              secondary={
                <Fragment>
                  <Typography component="span">{caption}</Typography>

                  {type !== MessageType.PHONE && (
                    <Typography component="span">{body}</Typography>
                  )}

                  {type === MessageType.PHONE && (
                    <Typography component="span">{subject}</Typography>
                  )}
                </Fragment>
              }
            />
          </ListItemButton>
        </Link>
      </ListWrapper>
      <Divider variant="inset" />
    </Box>
  );
}, areEqual);

Item.displayName = 'MessageItem';
