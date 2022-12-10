import { configureStore } from '@reduxjs/toolkit';

import { useDispatch } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistStore,
  persistReducer,
  persistCombineReducers,
} from 'redux-persist';
import rootReducer from './rootReducer';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

const persistConfig = {
  key: 'rn-bank-app',
  storage: AsyncStorage,
  blacklist: ['rn_bank_app_common'],
  stateReconciler: hardSet,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const useAppDispatch = () => useDispatch();
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
const persistor = persistStore(store);
export { store, persistor };
