// @flow
import { STATUS, actions } from './types';
import type { TwoFactorState } from './types';

export const twoFactorReducer = (
  state: TwoFactorState,
  { type, payload }: { type: string, payload: any }
) => {
  switch (type) {
    case actions.SETUP_2FA_REQUEST:
      return {
        ...state,
        status: STATUS.GETTING,
        error: null,
      };

    case actions.SETUP_2FA_SUCCESS:
      return {
        ...state,
        status: STATUS.IDLE,
        data: payload,
      };

    case actions.SETUP_2FA_FAILURE:
      return {
        ...state,
        status: STATUS.IDLE,
        error: payload,
      };

    case actions.CONFIRM_2FA_REQUEST:
      return {
        ...state,
        status: STATUS.SAVING,
        error: null,
      };

    case actions.CONFIRM_2FA_SUCCESS:
      return {
        ...state,
        status: STATUS.IDLE,
        confirmed: true,
      };

    case actions.CONFIRM_2FA_FAILURE:
      return {
        ...state,
        status: STATUS.IDLE,
        error: payload,
      };

    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};
