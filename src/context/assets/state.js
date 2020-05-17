// @flow
import { ASSETS_STATUS } from './types';

import type { AssetsListState } from './types';

export const initialState: AssetsListState = {
  assets: [],
  status: ASSETS_STATUS.INIT,
  error: null,
  page: 0,
  limit: 5,
  total: null,
};
