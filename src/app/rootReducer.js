import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer, createMigrate, createTransform } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import AsyncStorage from '@react-native-async-storage/async-storage';
// import { parse, stringify } from 'flatted';

import auth from '../reducers/auth';
import { authMigrations } from './migrations';

// export const transformCircular = createTransform(
//   (inboundState, key) => stringify(inboundState),
//   (outboundState, key) => parse(outboundState)
// );

const authPersistConfig = {
  key: 'rn-bank-app-auth',
  version: 1,
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  timeout: null,
  migrate: createMigrate(authMigrations, { debug: false }),
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
});

export default rootReducer;
