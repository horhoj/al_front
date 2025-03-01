import { profile } from 'console';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import * as rp from 'redux-persist';
import { settingsReducer } from './settingsSlice';
import { infoReducer } from '~/features/info/infoSlice';
import { authReducer } from '~/features/auth/authSlice';
import { profileReducer } from '~/features/profile/profileSlice';

const reducers = combineReducers({
  settings: settingsReducer,
  info: infoReducer,
  auth: authReducer,
  profile: profileReducer,
});

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
    // whitelist: ['settings'],
    whitelist: [],
  },
  reducers,
);

export const store = configureStore({
  devTools: true,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [rp.FLUSH, rp.REHYDRATE, rp.PAUSE, rp.PERSIST, rp.PURGE, rp.REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
