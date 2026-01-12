import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { PaginatedMerchantListList } from '@/lib/types';

export function useMerchants(limit = 10, offset = 0) {
  return useQuery({
    queryKey: ['merchants', { limit, offset }],
    queryFn: async (): Promise<PaginatedMerchantListList> => {
      const response = await apiClient.get('/merchants/', {
        params: { limit, offset },
      });
      return response.data;
    },
  });
}
