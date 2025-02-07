import type { AxiosInstance } from 'axios';
import type { authResponseT, loginFormT } from '../model/types';
import { authResponseSchema } from '../model/schema';
import axiosInstance from '../../../shared/api/axiosInstance';

class AuthService {
  constructor(private readonly client: AxiosInstance) {}

  async login(data: loginFormT): Promise<authResponseT> {
    const response = await this.client.post('/api/auth/login', data);
    return authResponseSchema.parse(response.data);
  }

  async refresh(): Promise<authResponseT> {
    const response = await this.client.get('/api/auth/refresh');
    return authResponseSchema.parse(response.data);
  }

  async logout(): Promise<void> {
    await this.client.get('/api/auth/logout'); 
  }
}

export default new AuthService(axiosInstance);
