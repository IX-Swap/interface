import { postOrderActions } from './types'

export function postOrderReducer (state, action) {
  switch (action.type) {
    case postOrderActions.GET_POST_ORDER_REQUEST:
      return {
        ...state,
        data: [],
        isLoading: true,
        message: '',
        error: null
      }
    case postOrderActions.GET_POST_ORDER_SUCCESS:
      return {
        ...state,
        data: action.data,
        isLoading: true,
        message: '',
        error: null
      }
    case postOrderActions.GET_POST_ORDER_FAILURE:
      return {
        ...state,
        data: [],
        isLoading: true,
        message: '',
        error: null
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}
