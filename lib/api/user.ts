import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { CustomerProfile, CustomerBalance } from '@/lib/types';

export function useProfile() {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: async (): Promise<CustomerProfile> => {
      const response = await apiClient.get('/user/profile/');
      return response.data;
    },
  });
}

export function useBalance() {
  return useQuery({
    queryKey: ['user', 'balance'],
    queryFn: async (): Promise<CustomerBalance> => {
      const response = await apiClient.get('/user/balance/');
      return response.data;
    },
  });
}
