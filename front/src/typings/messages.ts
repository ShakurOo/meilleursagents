// eslint-disable-next-line no-unused-vars
export enum MessageType {
  EMAIL = 'email',
  PHONE = 'phone',
  SMS = 'sms',
}

export interface Message {
  body: string;
  contact: {
    email: string;
    firstname: string;
    lastname: string;
    phone: string;
  };
  date: string;
  id: number;
  read: boolean;
  subject: string;
  type: MessageType;
}
