// @flow
import { assetsActions, ASSETS_STATUS } from './types';

import type { AssetsListState } from './types';

export default function assetsReducer(
  state: AssetsListState,
  { type, payload }: { type: string, ...any }
): AssetsListState {
  console.log(type, payload);
  switch (type) {
    case assetsActions.GET_ASSETS_REQUEST:
      return {
        ...state,
        status: ASSETS_STATUS.GETTING,
        error: '',
      };
    case assetsActions.GET_ASSETS_SUCCESS:
      return {
        ...state,
        status: ASSETS_STATUS.IDLE,
        error: null,
        assets: payload.assets,
        total: payload.total,
      };
    case assetsActions.GET_ASSETS_FAILURE:
      return {
        ...state,
        status: ASSETS_STATUS.IDLE,
        error: payload.message,
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
}
