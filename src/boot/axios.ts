import type { InternalAxiosRequestConfig, AxiosInstance } from 'axios';
import axios from 'axios';
import { UNPROTECTED_PATHS } from 'src/constants/api.constants';

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'http://localhost:8080' });

const isUnprotected = (url: string): boolean => {
  return UNPROTECTED_PATHS.some((endpoint) => url.includes(endpoint));
};

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!isUnprotected(config.url || '')) {
      const token = sessionStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(new Error(error)),
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
)

export { api };
