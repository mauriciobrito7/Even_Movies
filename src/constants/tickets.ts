import { Ticket } from '@/types/ticket';

export const TICKET_OPTIONS: Ticket = {
  'child':{ type: 'child', price: 5 } ,
  'senior':{ type: 'senior', price: 7 } ,
  'adult': { type: 'adult', price: 10 } ,
};

export const MAX_TICKET_COUNT = 10;
export const MIN_TICKET_COUNT = 0;
