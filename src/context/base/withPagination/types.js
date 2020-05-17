// @flow
export type GenericActions = {
  GET_REQUEST: string,
  GET_SUCCESS: string,
  GET_FAILURE: string,

  PAGE_CHANGE: string,
  ROWS_PER_PAGE_CHANGE: string,
};

export type GenericStatus = {
  INIT: string,
  IDLE: string,
  GETTING: string,
};

const camelToSnake = (string) =>
  string.replace(/[\w]([A-Z])/g, (m) => `${m[0]}_${m[1]}`).toUpperCase();

const generateActions = (name): GenericActions => ({
  GET_REQUEST: `GET_${camelToSnake(name)}_REQUEST`,
  GET_SUCCESS: `GET_${camelToSnake(name)}_SUCCESS`,
  GET_FAILURE: `GET_${camelToSnake(name)}_FAILURE`,

  PAGE_CHANGE: `GET_${camelToSnake(name)}_PAGE_CHANGE`,
  ROWS_PER_PAGE_CHANGE: `GET_${camelToSnake(name)}_ROWS_PERPAGE_CHANGE`,
});

export const generateStatus = (): GenericStatus => ({
  INIT: 'INIT',
  IDLE: 'IDLE',
  GETTING: 'GETTING',
});

export default (name: string) => ({
  actionTypes: generateActions(name),
  status: generateStatus(),
});

export type BaseStateWithPagination<T> = {
  items: Array<T>,
  page: number,
  limit: number,
  total: ?number,
  error: ?string,
  statusCode: ?number,
  errorCode: ?string | ?number,
  status: string,
};
