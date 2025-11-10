// app/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import postsReducer from '../features/postSlice';
import authReducer from '../features/authSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Usa localStorage por defecto

// Combina tus reducers
const rootReducer = combineReducers({
  posts: postsReducer,
  auth: authReducer,
});

// Configuración de persistencia
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth'],
};

// Crea un reducer persistente
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configura el store con el reducer persistente
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Exporta el persistor
export const persistor = persistStore(store);

// Tipos para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
