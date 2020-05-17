// @flow
import { STATUS } from './types';
import type { IdentityState } from './types';

export const initialState: IdentityState = {
  identity: {},
  status: STATUS.INIT,
  shouldCreateNew: false,
  editMode: false,
  error: {
    save: null,
    get: null,
  },
};
