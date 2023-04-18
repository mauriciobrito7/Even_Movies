import { Ticket } from '@/types/ticket';

export const TICKET_OPTIONS: Ticket[] = [
  { type: 'child', price: 5 },
  { type: 'senior', price: 7 },
  { type: 'adult', price: 10 },
];

export const MAX_TICKET_COUNT = 10;
export const MIN_TICKET_COUNT = 0;
