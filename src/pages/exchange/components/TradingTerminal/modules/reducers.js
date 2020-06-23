import { marketListActions } from './types'
// import { initialState } from './state';

export function marketReducer (state, action) {
  switch (action.type) {
    case marketListActions.GET_MARKET_LIST_REQUEST:
      return {
        ...state,
        data: [],
        isLoading: true,
        message: '',
        error: null
      }
    case marketListActions.GET_MARKET_LIST_SUCCESS:
      return {
        ...state,
        data: action.data,
        isLoading: true,
        message: '',
        error: null
      }
    case marketListActions.GET_MARKET_LIST_FAILURE:
      return {
        ...state,
        data: [],
        isLoading: true,
        message: '',
        error: null
      }
    case marketListActions.SUBSCRIBE_MARKET_TRADE_REQUEST:
      return {
        ...state,
        data: [],
        isLoading: true,
        message: '',
        error: null
      }
    case marketListActions.SUBSCRIBE_MARKET_TRADE_SUCCESS:
      return {
        ...state,
        data: action,
        isLoading: true,
        message: '',
        error: null
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}
