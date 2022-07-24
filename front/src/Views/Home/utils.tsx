import { Drafts, Mail, Phone, Sms } from '@mui/icons-material';

import { MessageType } from '../../typings/messages';

export const getMessageIcon = (
  type: MessageType,
  read: boolean,
  color: any = 'primary',
) => {
  switch (type) {
    case MessageType.EMAIL:
      return read ? <Drafts /> : <Mail color={color} />;
    case MessageType.PHONE:
      return <Phone color={color} />;
    case MessageType.SMS:
      return <Sms color={color} />;
  }
};

export const getMessageFrom = (contact: any): string =>
  contact.firstname ? `${contact.firstname} ${contact.lastname}` : contact.phone;
