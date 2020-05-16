// @flow
import type { BaseStateWithPagination } from 'context/base/withPagination/types';

export const userUpdateRoleActions = {
  USER_UPDATE_ROLE_REQUEST: 'USER_UPDATE_ROLE_REQUEST',
  USER_UPDATE_ROLE_SUCCESS: 'USER_UPDATE_ROLE_SUCCESS',
  USER_UPDATE_ROLE_FAILURE: 'USERS_LIST_GET_FAILURE',
};

export type User = {
  _id: string,
  email: string,
  roles: string,
};

export type UsersListState = BaseStateWithPagination<User> & {
  users: Array<User>,
  page: number,
  limit: number,
  total: ?number,
  error: ?string,
  status: string,
};
