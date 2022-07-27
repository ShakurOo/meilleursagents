import { Drafts, Mail, Phone, Sms } from '@mui/icons-material';

import { Message, MessageType } from '../../types/message';

export const getMessageIcon = ({ read, type }: Partial<Message>) => {
  const color = read ? 'disabled' : 'primary';
  switch (type) {
    case MessageType.EMAIL:
      return read ? <Drafts color={color} /> : <Mail color={color} />;
    case MessageType.PHONE:
      return <Phone color={color} />;
    case MessageType.SMS:
      return <Sms color={color} />;
  }
};

export const getMessageFrom = ({ contact }: Partial<Message>): string =>
  contact?.firstname ? `${contact.firstname} ${contact.lastname}` : contact?.phone || '';

export const getMessageAsReadPayload = (message: Message | null): Message | {} => {
  const { id, ...restMessage } = message || {};
  return { ...restMessage, ...(restMessage && { read: true }) };
};
