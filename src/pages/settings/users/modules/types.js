// @flow

export const usersListGetActions = {
  USERS_LIST_GET_CHANGE_PAGE: 'USERS_LIST_GET_CHANGE_PAGE',
  USERS_LIST_GET_REQUEST: 'USERS_LIST_GET_REQUEST',
  USERS_LIST_GET_SUCCESS: 'USERS_LIST_GET_SUCCESS',
  USERS_LIST_GET_FAILURE: 'USERS_LIST_GET_FAILURE',
};

export const userUpdateRoleActions = {
  USER_UPDATE_ROLE_REQUEST: 'USER_UPDATE_ROLE_REQUEST',
  USER_UPDATE_ROLE_SUCCESS: 'USER_UPDATE_ROLE_SUCCESS',
  USER_UPDATE_ROLE_FAILURE: 'USERS_LIST_GET_FAILURE',
};

export const USERS_LIST_STATUS = {
  INIT: 'INIT',
  IDLE: 'IDLE',
  GETTING: 'GETTING',
};

export type User = {
  _id: string,
  email: string,
  roles: string,
};

export type UsersListState = {
  users: Array<User>,
  page: number,
  limit: number,
  total: ?number,
  error: ?string,
  status: string,
};
