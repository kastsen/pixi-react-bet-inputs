import { configureStore } from '@reduxjs/toolkit';
import betReducer from './features/bet/model/betSlice';

export const store = configureStore({
    reducer: {
        bet: betReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
