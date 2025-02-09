import { createSlice } from '@reduxjs/toolkit';
import type { AuthSliceT } from './types';
import { getCurrent, loginThunk, logoutThunk, refreshThunk } from './authThunks';

const initialState: AuthSliceT = {
  user: null,
  accessToken: null,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshThunk.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    });
    builder.addCase(refreshThunk.rejected, (state) => {
      state.user = null;
      state.accessToken = null;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.error = action.error.message ?? 'Ошибка входа';
    });
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.user = null;
      state.accessToken = null;
    });
    builder.addCase(logoutThunk.rejected, (state, action) => {
      state.error = action.error.message ?? 'Ошибка выхода';
    });
    builder.addCase(getCurrent.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
    builder.addCase(getCurrent.rejected, (state) => {
      state.user = null;
    });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
