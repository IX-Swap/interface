// @flow
export const assetsActions = {
  GET_ASSETS_REQUEST: 'GET_ASSETS_REQUEST',
  GET_ASSETS_SUCCESS: 'GET_ASSETS_SUCCESS',
  GET_ASSETS_FAILURE: 'GET_ASSETS_FAILURE',
};

export const ASSETS_STATUS = {
  INIT: 'INIT',
  IDLE: 'IDLE',
  GETTING: 'GETTING',
  SAVING: 'SAVING',
};

export type Asset = {
  _id: string,
  symbol: string,
  name: string,
  type: string,
};

export type AssetsListState = {
  assets: Array<Asset>,
  page: number,
  limit: number,
  total: ?number,
  error: ?string,
  status: string,
};
