// @flow
import { isEmpty } from 'lodash';
import localStore from 'services/storageHelper';
import { USER_STATUS } from './types';
import type { UserAuthState } from './types';

export const initialState: UserAuthState = {
  user: {
    _id: '',
    roles: '',
    email: '',
    name: '',
    verified: false,
    accountType: '',
    totpConfirmed: false,
  },
  status: USER_STATUS.INIT,
  isAuthenticated: !isEmpty(localStore.get()),
  isLoading: false,
  message: '',
  activeTabId: 0,
  error: '',
};
