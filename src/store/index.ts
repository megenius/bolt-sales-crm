import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './slices/contactsSlice';
import dealsReducer from './slices/dealsSlice';
import activitiesReducer from './slices/activitiesSlice';
import tasksReducer from './slices/tasksSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    deals: dealsReducer,
    activities: activitiesReducer,
    tasks: tasksReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;