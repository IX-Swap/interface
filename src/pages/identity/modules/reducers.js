import { STATUS, actions } from './types';
import type { IdentityState } from './types';

export const identityReducer = (
  state: IdentityState,
  { type, payload }: { type: string, payload: any }
) => {
  switch (type) {
    case actions.GET_IDENTITY_REQUEST:
      return {
        ...state,
        status: STATUS.GETTING,
        error: { ...state.error, get: null },
      };

    case actions.GET_IDENTITY_SUCCESS:
      return {
        ...state,
        status: STATUS.IDLE,
        identity: payload.identity,
        shouldCreateNew: payload.shouldCreateNew,
        editMode: payload.editMode,
      };

    case actions.GET_IDENTITY_FAILURE:
      return {
        ...state,
        status: STATUS.IDLE,
        error: { ...state.error, get: payload },
      };

    case actions.CREATE_IDENTITY_REQUEST:
      return {
        ...state,
        status: STATUS.SAVING,
        error: { ...state.error, save: null },
      };

    case actions.CREATE_IDENTITY_SUCCESS:
      return {
        ...state,
        status: STATUS.IDLE,
        identity: payload,
        editMode: false,
      };

    case actions.CREATE_IDENTITY_FAILURE:
      return {
        ...state,
        status: STATUS.IDLE,
        error: { ...state.error, save: payload },
      };

    case actions.SAVE_IDENTITY_REQUEST:
      return {
        ...state,
        status: STATUS.SAVING,
        error: { ...state.error, save: null },
      };

    case actions.SAVE_IDENTITY_SUCCESS:
      return {
        ...state,
        status: STATUS.IDLE,
        identity: payload,
        shouldCreateNew: false,
      };

    case actions.SAVE_IDENTITY_FAILURE:
      return {
        ...state,
        status: STATUS.IDLE,
        error: { ...state.error, save: payload },
      };

    case actions.SAVE_FILE_REQUEST:
      return {
        ...state,
        status: STATUS.SAVING,
        error: { ...state.error, save: null },
      };

    case actions.SAVE_FILE_SUCCESS:
      return { ...state, status: STATUS.IDLE };

    case actions.SAVE_FILE_FAILURE:
      return {
        ...state,
        status: STATUS.IDLE,
        error: { ...state.error, save: payload },
      };

    case actions.DOWNLOAD_FILE_REQUEST:
      return {
        ...state,
        status: STATUS.GETTING,
        error: { ...state.error, get: null },
      };

    case actions.DOWNLOAD_FILE_SUCCESS:
      return {
        ...state,
        status: STATUS.IDLE,
        error: { ...state.error, get: null },
      };

    case actions.DOWNLOAD_FILE_FAILURE:
      return {
        ...state,
        status: STATUS.IDLE,
        error: { ...state.error, get: payload.message },
      };

    case actions.UPDATE_ACCOUNT_TYPE_REQUEST: {
      return {
        ...state,
        status: STATUS.GETTING,
      };
    }

    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};
