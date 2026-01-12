import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type {
  MerchantLoginRequest,
  MerchantLoginResponse,
  MerchantProfile,
  MerchantStats,
  MerchantTransaction,
  VoucherValidationRequest,
  VoucherValidationResponse,
  RedemptionRequest,
  RedemptionResponse,
} from '@/lib/types';

// Token is now handled by HttpOnly cookie and Middleware proxy
// Profile is still stored in localStorage for UI convenience

// Helper to store merchant profile
function getMerchantProfile(): MerchantProfile | null {
  if (typeof window !== 'undefined') {
    const profile = localStorage.getItem('merchant_profile');
    return profile ? JSON.parse(profile) : null;
  }
  return null;
}

export function useMerchantLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: MerchantLoginRequest): Promise<MerchantLoginResponse> => {
      // Proxied to /api/proxy/merchant/auth/login => /api/merchant/auth/login
      const response = await apiClient.post('/merchant/auth/login/', data);
      return response.data;
    },
    onSuccess: (data) => {
      if (typeof window !== 'undefined') {
        // Only store profile, tokens are in cookies
        localStorage.setItem('merchant_profile', JSON.stringify(data.merchant));
      }
      queryClient.setQueryData(['merchant', 'profile'], data.merchant);
    },
  });
}

export function useMerchantLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Call standard logout endpoint to clear cookies
      await apiClient.post('/auth/logout/');
      if (typeof window !== 'undefined') {
        localStorage.removeItem('merchant_profile');
      }
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['merchant'] });
      if (typeof window !== 'undefined') {
          window.location.href = '/merchant-login';
      }
    },
  });
}

export function useMerchantProfile() {
  return useQuery({
    queryKey: ['merchant', 'profile'],
    queryFn: async (): Promise<MerchantProfile | null> => {
      return getMerchantProfile();
    },
    staleTime: Infinity,
  });
}

export function useMerchantStats() {
  return useQuery({
    queryKey: ['merchant', 'stats'],
    queryFn: async (): Promise<MerchantStats> => {
      // Authorization header injected by middleware
      const response = await apiClient.get('/merchant/stats/');
      return response.data;
    },
    // We can assume enabled if profile exists or just let it fail/redirect
    enabled: true, 
  });
}

export function useMerchantTransactions(date?: string) {
  return useQuery({
    queryKey: ['merchant', 'transactions', date],
    queryFn: async (): Promise<MerchantTransaction[]> => {
      const response = await apiClient.get('/merchant/transactions/', {
        params: date ? { date } : {},
      });
      return response.data;
    },
    enabled: true,
  });
}

export function useValidateVoucher() {
  return useMutation({
    mutationFn: async (data: VoucherValidationRequest): Promise<VoucherValidationResponse> => {
      const response = await apiClient.post('/merchant/validate/', data);
      return response.data;
    },
  });
}

export function useRedeemVoucher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RedemptionRequest): Promise<RedemptionResponse> => {
      const response = await apiClient.post('/merchant/redeem/', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['merchant', 'stats'] });
      queryClient.invalidateQueries({ queryKey: ['merchant', 'transactions'] });
    },
  });
}
