import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type {
  CustomerLoginRequest,
  CustomerRegistrationRequest,
  CustomerProfile,
  TokenObtainPair,
} from '@/lib/types';

interface LoginResponse extends CustomerProfile {
  tokens: TokenObtainPair;
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CustomerLoginRequest): Promise<LoginResponse> => {
      // Endpoint is now proxied: /api/proxy/auth/login => /api/auth/login (Backend)
      // Backend sets cookies on response.
      const response = await apiClient.post('/auth/login/', data);
      return response.data;
    },
    onSuccess: (data) => {
      // Cookies are automatically set by browser
      queryClient.setQueryData(['user', 'profile'], data);
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CustomerRegistrationRequest): Promise<LoginResponse> => {
      const response = await apiClient.post('/auth/register/', data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user', 'profile'], data);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
       await apiClient.post('/auth/logout/');
    },
    onSuccess: () => {
      queryClient.clear();
       if (typeof window !== 'undefined') {
         window.location.href = '/login';
       }
    },
  });
}
