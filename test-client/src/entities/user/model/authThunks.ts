import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../api';
import { loginFormSchema } from './schema';
import type { AuthResponseT, LoginFormT } from './types';

export const loginThunk = createAsyncThunk<AuthResponseT, LoginFormT>(
  'auth/login',
  async (formData) => {
    const data = loginFormSchema.parse(formData);
    const response = await authService.login(data);

    localStorage.setItem('accessToken', response.accessToken);
    return response;
  }
);


export const logoutThunk = createAsyncThunk<void, void>(
  'auth/logout',
  async () => {
    return authService.logout();
  }
);

export const refreshThunk = createAsyncThunk<AuthResponseT, void>(
  'auth/refresh',
  async () => {
    return authService.refresh();
  }
);

export const getCurrent = createAsyncThunk<AuthResponseT, void>(
  'auth/current',
  async () => {
    return authService.current();
  }
);
