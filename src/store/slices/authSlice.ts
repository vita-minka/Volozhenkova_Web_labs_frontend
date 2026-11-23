import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Только axios, без кодогенерации!

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/login', credentials);
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка входа');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await axios.post('/api/auth/logout');
});

export const checkAuth = createAsyncThunk('auth/check', async () => {
  try {
    const response = await axios.get('/api/auth/me');
    return response.data;
  } catch {
    return null; // Если 401 — значит гость
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null as any | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export default authSlice.reducer;