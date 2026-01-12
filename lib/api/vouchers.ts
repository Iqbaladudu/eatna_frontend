import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { PaginatedVoucherList, Voucher, VoucherCreateRequest } from '@/lib/types';

export function useVouchers(limit = 10, offset = 0) {
  return useQuery({
    queryKey: ['vouchers', { limit, offset }],
    queryFn: async (): Promise<PaginatedVoucherList> => {
      const response = await apiClient.get('/vouchers/', {
        params: { limit, offset },
      });
      return response.data;
    },
  });
}

export function useVoucher(code: string) {
  return useQuery({
    queryKey: ['voucher', code],
    queryFn: async (): Promise<Voucher> => {
      const response = await apiClient.get(`/vouchers/${code}/`);
      return response.data;
    },
    enabled: !!code,
  });
}

export function useCreateVoucher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: VoucherCreateRequest): Promise<Voucher> => {
      const response = await apiClient.post('/vouchers/', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vouchers'] });
      queryClient.invalidateQueries({ queryKey: ['user', 'balance'] });
    },
  });
}
