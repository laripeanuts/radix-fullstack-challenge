import axios, { AxiosInstance } from 'axios';
import { env } from "../../env";

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: `${env.BASE_BACKEND_URL}/api`,
    });
  }

  public getApi(): AxiosInstance {
    return this.api;
  }
}

const apiService = new ApiService();

export const api = apiService.getApi();
