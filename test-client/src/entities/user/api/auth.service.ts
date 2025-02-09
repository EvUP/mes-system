import type { AxiosInstance } from 'axios';
import type { AuthResponseT, LoginFormT } from '../model/types';
import { authResponseSchema } from '../model/schema';
import { default as axiosInstance } from '../../../shared/api/axiosInstance';


class AuthService {
  constructor(private readonly client: AxiosInstance) {}

  async login(data: LoginFormT): Promise<AuthResponseT> {
    const response = await this.client.post('/auth/login', data);
    return authResponseSchema.parse(response.data);
  }

  async refresh(): Promise<AuthResponseT> {
    const response = await this.client.get('/auth/refresh');
    return authResponseSchema.parse(response.data);
  }

  async logout(): Promise<void> {
    await this.client.get('/auth/logout');
  }

  async current(): Promise<AuthResponseT> {
    const response = await this.client.get('/auth/current');
    return authResponseSchema.parse(response.data);
  }
}

export default new AuthService(axiosInstance);
