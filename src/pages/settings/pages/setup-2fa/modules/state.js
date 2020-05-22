// @flow
import { STATUS } from './types';
import type { TwoFactorState } from './types';

export const initialState: TwoFactorState = {
  confirmed: false,
  status: STATUS.INIT,
  error: null,
  data: null,
};
