import axios from 'axios';

const apiUrl: string | undefined = process.env.NEXT_PUBLIC_API_URL;

// @Services
import {CookieService} from "@/lib/utils/CookieService";
import {LocalStorageService} from "@/lib/utils/LocalStorageService";

// Creating an Axios instance
const apiAxios = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  // You can add default headers here
});

// Request Interceptor
apiAxios.interceptors.request.use(
  config => {
    const token = CookieService.getCookie('accessToken')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Set Content-Type dynamically. If not set in the request, default to 'application/json'
    config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json';

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response Interceptor
apiAxios.interceptors.response.use(
  response => response.data,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = CookieService.getCookie('refreshToken');

      if (refreshToken) {
        try {
          const newTokenResponse = await axios.post(`${apiUrl}auth/refresh`, '', {
            headers: {
              'Authorization': `Bearer ${refreshToken}`
            }
          });

          CookieService.setCookie('accessToken', newTokenResponse.data?.accessToken);
          CookieService.setCookie('refreshToken', newTokenResponse.data?.refreshToken);

          return apiAxios(originalRequest);
        } catch (refreshError) {
          clearUserDataAndRedirect()
          return Promise.reject(refreshError);
        }
      }
    }
    if (!!error?.response?.data) return Promise.reject(error?.response?.data);
    if (!!error?.response) return Promise.reject(error?.response);
    return Promise.reject(error);
  }
);

const clearUserDataAndRedirect = () => {
  CookieService.removeCookie('accessToken')
  CookieService.removeCookie('refreshToken')
  LocalStorageService.removeItem('user')
  window.location.href = '/login';
}

export default apiAxios;
