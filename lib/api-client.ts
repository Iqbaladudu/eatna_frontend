import axios from 'axios';

// Use internal API proxy path
const API_BASE_URL = '/api/proxy';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important: Send cookies with requests
});

// Response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh endpoint - cookies are sent automatically
        await axios.post(`${API_BASE_URL}/token/refresh/`, {}, { withCredentials: true });
        
        // Retry original request - fresh cookies will be sent automatically
        return apiClient(originalRequest);
      } catch {
        // Refresh failed, redirect to login
        if (typeof window !== 'undefined') {
             // Determine if merchant or customer
             if (window.location.pathname.startsWith('/merchant')) {
                 window.location.href = '/merchant-login';
             } else {
                 window.location.href = '/login';
             }
        }
      }
    }

    return Promise.reject(error);
  }
);
