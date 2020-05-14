// @flow
import { USERS_LIST_STATUS } from './types';
import type { UsersListState } from './types';

export const initialState: UsersListState = {
  users: [],
  page: 1,
  limit: 5,
  total: null,
  error: null,
  status: USERS_LIST_STATUS.INIT,
};
