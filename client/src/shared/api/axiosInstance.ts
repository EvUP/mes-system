import type { AxiosError } from 'axios';
import axios from 'axios';
import { authResponseSchema } from '../../entities/user/model/schema';
import type { AppStore } from '../../app/lib/store';

let store: AppStore | undefined;

export function injectStore(_store: AppStore): void {
  store = _store;
}

const axiosInstance = axios.create({
  baseURL: '/api',
});

axiosInstance.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${store?.getState().auth.accessToken ?? ''}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError & { config: { sent?: boolean } }) => {
    const prevRequest = error.config;
    if (error.response?.status === 403 && !prevRequest.sent) {
      const response = await axios('/api/tokens/refresh');

      const { accessToken } = authResponseSchema.parse(response.data);

      store?.dispatch({ type: 'auth/setAccessToken', payload: accessToken });

      prevRequest.sent = true;
      prevRequest.headers.Authorization = `Bearer ${store?.getState().auth.accessToken ?? ''}`;
      return axiosInstance(prevRequest);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
