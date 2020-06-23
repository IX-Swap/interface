// @flow
export const assetsActions = {
  GET_ASSETS_REQUEST: 'GET_ASSETS_REQUEST',
  GET_ASSETS_SUCCESS: 'GET_ASSETS_SUCCESS',
  GET_ASSETS_FAILURE: 'GET_ASSETS_FAILURE',

  SET_ASSET_TYPE: 'SET_ASSET_TYPE'
}

export const ASSETS_STATUS = {
  INIT: 'INIT',
  IDLE: 'IDLE',
  GETTING: 'GETTING',
  SAVING: 'SAVING'
}

export interface BaseAsset {
  _id: string;
}

export type Asset = BaseAsset & {
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
  type: 'Security' | 'Currency',
};
