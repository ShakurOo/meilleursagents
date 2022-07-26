import { fr } from 'date-fns/locale';

export const API_DOMAIN = '//localhost:8080';

const DATE_FNS_FORMAT_RELATIVE_LOCALE = {
  lastWeek: 'eeee',
  other: 'dd/MM/yyyy',
  today: 'HH:mm',
  yesterday: "'Hier'",
} as any;

export const DATE_FNS_LOCALE = {
  ...fr,
  formatRelative: (token: string) => DATE_FNS_FORMAT_RELATIVE_LOCALE[token],
};
