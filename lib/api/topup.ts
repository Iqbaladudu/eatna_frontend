import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { TopupCreateRequest, TopupResponse } from '@/lib/types';

export function useCreateTopup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TopupCreateRequest): Promise<TopupResponse> => {
      const response = await apiClient.post('/topup/', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'balance'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });
}
