// @flow

export const actions = {
  SETUP_2FA_REQUEST: 'SETUP_2FA_REQUEST',
  SETUP_2FA_SUCCESS: ' SETUP_2FA_SUCCESS',
  SETUP_2FA_FAILURE: 'SETUP_2FA_FAILURE',

  CONFIRM_2FA_REQUEST: 'CONFIRM_2FA_REQUEST',
  CONFIRM_2FA_SUCCESS: ' CONFIRM_2FA_SUCCESS',
  CONFIRM_2FA_FAILURE: 'CONFIRM_2FA_FAILURE',
};

export const STATUS = {
  INIT: 'INIT',
  IDLE: 'IDLE',
  GETTING: 'GETTING',
  SAVING: 'SAVING',
};

export type TwoFactorState = {
  status: string,
  data: {
    key: string,
    encoded: string,
    image: string,
  } | null,
  error: string | null,
  confirmed: boolean,
};
