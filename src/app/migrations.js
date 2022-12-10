import { authState } from '../reducers/auth';

export const authMigrations = {
  1: (state) => {
    return {
      ...authState,
      ...state,
    };
  },
};
