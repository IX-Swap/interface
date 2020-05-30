import { listViewActions } from './types';

export function listViewReducer(state, action) {
  switch (action.type) {
    case listViewActions.GET_LISTING_ITEM_REQUEST:
      return {
        ...state,
        data: null,
        isLoading: true,
        message: '',
        error: null,
      };
    case listViewActions.GET_LISTING_ITEM_SUCCESS:
      return {
        ...state,
        data: action.data,
        isLoading: true,
        message: '',
        error: null,
      };
    case listViewActions.GET_LISTING_ITEM_FAILURE:
      return {
        ...state,
        data: null,
        isLoading: true,
        message: '',
        error: null,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
