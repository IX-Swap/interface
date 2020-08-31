import { initialState } from './state'
import { USER_STATUS } from '../../const/status'

export function userReducer (state, action) {
  switch (action.type) {
    case userActions.LOGIN_REQUEST:
      return {
        ...state,
        user: initialState.user,
        isAuthenticated: false,
        isLoading: true,
        message: '',
        error: null
      }
    case userActions.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        isVerified: true,
        message: '',
        error: null
      }
    case userActions.LOGIN_FAILURE:
      return {
        ...state,
        user: initialState.user,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
      }
    case userActions.GET_AUTH_ME_REQUEST:
      return {
        ...state,
        user: action.payload,
        status: USER_STATUS.GETTING,
        isLoading: true,
        error: null
      }
    case userActions.GET_AUTH_ME_SUCCESS:
      return {
        ...state,
        status: USER_STATUS.IDLE,
        user: action.payload,
        isLoading: false,
        error: null
      }
    case userActions.GET_AUTH_ME_FAILURE:
      return {
        ...state,
        status: USER_STATUS.IDLE,
        isLoading: false,
        user: initialState.user,
        error: action.payload
      }
    case userActions.SIGN_OUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false
      }
    case userActions.SIGN_UP_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: true,
        error: null
      }
    case userActions.SIGN_UP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        activeTabId: 0
      }
    case userActions.SIGN_UP_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
      }
    case userActions.SET_ACTIVE_TAB_ID:
      return {
        ...state,
        activeTabId: action.payload,
        error: null
      }

    case userActions.VERIFY_SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        isVerified: false,
        error: ''
      }

    case userActions.VERIFY_SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isVerified: true,
        message: action.payload,
        error: ''
      }
    case userActions.VERIFY_SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        isVerified: false,
        error: action.payload
      }

    case userActions.CONFIRM_2FA_REQUEST:
      return {}
    case userActions.CONFIRM_2FA_SUCCESS:
      return {}
    case userActions.CONFIRM_2FA_FAILURE:
      return {}

    case userActions.SETUP_2FA_REQUEST:
      return {}
    case userActions.SETUP_2FA_SUCCESS:
      return {}
    case userActions.SETUP_2FA_FAILURE:
      return {}

    case userActions.VERIFY_2FA_REQUEST:
      return {}
    case userActions.VERIFY_2FA_SUCCESS:
      return {}
    case userActions.VERIFY_2FA_FAILURE:
      return {}

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}
