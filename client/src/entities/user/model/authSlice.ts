import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthSliceT } from './types';
import { loginThunk, logoutThunk, refreshThunk } from './authThunks';

const initialState: AuthSliceT = {
  user: null,
  accessToken: null,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(refreshThunk.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    });
    builder.addCase(refreshThunk.rejected, (state) => {
      state.accessToken = null;
      state.user = null;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.error = action.error.message ?? 'Очень странная ошибка';
    });
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.user = null;
      state.accessToken = null;
    });
    builder.addCase(logoutThunk.rejected, (state, action) => {
      state.error = action.error.message ?? 'Очень странная ошибка';
    });
  },
});

// Action creators are generated for each case reducer function
export const { setAccessToken, clearError } = authSlice.actions;

export default authSlice.reducer;
