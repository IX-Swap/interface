import { USERS_LIST_STATUS } from './types';

export const initialState = {
  users: [],
  page: 1,
  limit: 5,
  total: null,
  error: null,
  status: USERS_LIST_STATUS.INIT
}
