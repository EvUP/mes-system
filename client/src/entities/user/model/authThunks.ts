import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../api/auth.service';
import { loginFormSchema } from './schema';

export const loginThunk = createAsyncThunk('auth/login', async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  return authService.login(loginFormSchema.parse(data));
});

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  return authService.logout();
});

export const refreshThunk = createAsyncThunk('auth/refresh', async () => {
  return authService.refresh();
});
