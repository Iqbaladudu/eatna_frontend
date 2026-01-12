import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { PaginatedZoneList } from '@/lib/types';

export function useZones(limit = 100, offset = 0) {
  return useQuery({
    queryKey: ['zones', { limit, offset }],
    queryFn: async (): Promise<PaginatedZoneList> => {
      const response = await apiClient.get('/zones/', {
        params: { limit, offset },
      });
      return response.data;
    },
  });
}
