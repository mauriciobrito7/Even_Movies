import { Times } from '@/types';

export const getPeriodOfTime = (period?: Times): {
  from: string;
  to?: string;
} => {
  const today = new Date();
  
  switch (period) {
    case Times.LAST_MONTH:
      {
        const from = 
          new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString().split('T')[0];
        const to =
          new Date(today.getFullYear(), today.getMonth(), 0).toISOString().split('T')[0];
        return {
          from,
          to,
        };
      }
    default:
      return {
        from: today.toISOString().split('T')[0],
        to: today.toISOString().split('T')[0]
      };
  }
};
