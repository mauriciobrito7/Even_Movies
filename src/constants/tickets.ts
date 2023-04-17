import { ITicket } from '@/types/ticket';

export const TICKET_OPTIONS: ITicket[] = [
  { type: 'Child', price: 5 },
  { type: 'Senior', price: 7 },
  { type: 'Adult', price: 10 },
];

export const MAX_TICKET_COUNT = 10;
export const MIN_TICKET_COUNT = 0;
