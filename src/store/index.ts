import { configureStore } from '@reduxjs/toolkit';
import stagesReducer from './slices/stagesSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    stages: stagesReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;