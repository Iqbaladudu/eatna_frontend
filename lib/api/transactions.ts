import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { PaginatedTransactionList } from '@/lib/types';

export function useTransactions(limit = 10, offset = 0) {
  return useQuery({
    queryKey: ['transactions', { limit, offset }],
    queryFn: async (): Promise<PaginatedTransactionList> => {
      const response = await apiClient.get('/transactions/', {
        params: { limit, offset },
      });
      return response.data;
    },
  });
}
