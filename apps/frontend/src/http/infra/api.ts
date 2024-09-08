import { useStore } from '@/store';
import axios, { AxiosInstance } from 'axios';
import { env } from '../../../env';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: `${env.BASE_BACKEND_URL}/api`,
    });

    this.api.interceptors.request.use(
      (config) => {
        const { token } = useStore.getState();

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  public getApi(): AxiosInstance {
    return this.api;
  }
}

const apiService = new ApiService();

export const api = apiService.getApi();
