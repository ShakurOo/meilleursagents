import { ArrowBack, Inbox } from '@mui/icons-material';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { format } from 'date-fns';
import { FC, useContext } from 'react';
import { generatePath } from 'react-router-dom';

import { AppContext } from '../../../App.context';
import { Loader } from '../../../components';
import { Paths } from '../../../router/paths';
import { MessagesContext } from '../Messages.context';
import { getMessageFrom, getMessageIcon } from '../utils';
import { BACK_TO_LIST_LABEL, EMAIL_LABEL, PHONE_LABEL } from './constants';
import { BackButton, ExtraWrapper, TitleWrapper, WhiteWrapper, Wrapper } from './styles';

export const MessageDetails: FC = () => {
  const theme = useTheme();
  const isSmallViewport = useMediaQuery(theme.breakpoints.down('md'));
  const { activeRealtor } = useContext(AppContext);
  const { activeMessage, isLoading } = useContext(MessagesContext);

  if (isLoading || !activeMessage) {
    return (
      <Wrapper>
        <ExtraWrapper>
          {isLoading ? (
            <Loader />
          ) : (
            <Box component="span" data-testid="icon-empty">
              <Inbox />
            </Box>
          )}
        </ExtraWrapper>
      </Wrapper>
    );
  }

  const { body, contact, date, read, type } = activeMessage;

  const Icon = (
    <Box component="span" data-testid={read ? 'icon-disabled' : 'icon-enabled'}>
      {getMessageIcon({ read, type })}
    </Box>
  );
  const from = getMessageFrom({ contact, type });
  const labelizedDate = `Le ${format(new Date(date), 'dd/MM/yyyy à hh:mm')}`;

  return (
    <Wrapper>
      {isSmallViewport && (
        <BackButton
          to={generatePath(Paths.LIST_ID, { realtorId: activeRealtor?.id.toString() })}
        >
          <Button startIcon={<ArrowBack />} variant="outlined">
            {BACK_TO_LIST_LABEL}
          </Button>
        </BackButton>
      )}

      <WhiteWrapper>
        <TitleWrapper read={read}>
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
          <Typography paragraph>{body}</Typography>
        </Paper>
      </WhiteWrapper>
    </Wrapper>
  );
};
