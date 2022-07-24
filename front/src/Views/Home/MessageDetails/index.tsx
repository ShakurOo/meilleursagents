import { Inbox } from '@mui/icons-material';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import { format } from 'date-fns';
import { FC, useContext } from 'react';

import { Loader } from '../../../components';
import { MessagesContext } from '../Messages.context';
import { getMessageFrom, getMessageIcon } from '../utils';
import { EMAIL_LABEL, PHONE_LABEL } from './constants';
import { ExtraWrapper, TitleWrapper, WhiteWrapper, Wrapper } from './styles';

export const MessageDetails: FC = () => {
  const theme = useTheme();
  const { activeMessage, isLoading } = useContext(MessagesContext);

  if (isLoading || !activeMessage) {
    return (
      <Wrapper component="main">
        <ExtraWrapper>{isLoading ? <Loader /> : <Inbox />};</ExtraWrapper>;
      </Wrapper>
    );
  }

  const { body, contact, date, id, read, type, subject } = activeMessage;
  const Icon = getMessageIcon(
    type,
    read,
    read ? theme.palette.grey['300'] : theme.palette.primary.main,
  );

  const from = getMessageFrom(contact);
  const labelizedDate = `Le ${format(new Date(date), 'dd/MM/yyyy à hh:mm')}`;

  return (
    <Wrapper component="main">
      <WhiteWrapper>
        <TitleWrapper>
          <Box>{Icon}</Box>
          <Typography className="title-from" component="span" variant="h6">
            {from}
          </Typography>
        </TitleWrapper>

        {(contact.email || contact.phone) && (
          <List>
            {contact.email && (
              <ListItem className="head-list">
                <ListItemText primary={EMAIL_LABEL} />

                <ListItem
                  component="a"
                  key={contact.email}
                  href={`mailto:${from}@${contact.email}`}
                >
                  {contact.email}
                </ListItem>
              </ListItem>
            )}
            {contact.phone && (
              <ListItem className="head-list">
                <ListItemText primary={PHONE_LABEL} />

                <ListItem
                  component="a"
                  key={contact.phone}
                  href={`tel://${contact.phone}`}
                >
                  {contact.phone}
                </ListItem>
              </ListItem>
            )}
          </List>
        )}
      </WhiteWrapper>

      <WhiteWrapper>
        <Typography className="title-from" component="span" variant="h6">
          {from}
        </Typography>
        <Typography className="date">{labelizedDate}</Typography>

        <Paper className="body-wrapper" elevation={0}>
          <Typography paragraph>{activeMessage?.body}</Typography>
        </Paper>
      </WhiteWrapper>
    </Wrapper>
  );
};
