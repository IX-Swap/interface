import React from 'react'
import logger from 'use-reducer-logger'
import { postRequest } from './httpRequests'

const UserStateContext = React.createContext()
const UserDispatchContext = React.createContext()

const userActions = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  SIGN_OUT_SUCCESS: 'SIGN_OUT_SUCCESS',
  SIGN_UP_REQUEST: 'SIGN_UP_REQUEST',
  SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
  SIGN_UP_FAILURE: 'SIGN_UP_FAILURE',
  SET_ACTIVE_TAB_ID: 'SET_ACTIVE_TAB_ID'
}

export function userReducer (state, action) {
  switch (action.type) {
    case userActions.LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: true,
        error: null
      }
    case userActions.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        error: null
      }
    case userActions.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
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
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export function UserProvider ({ children }) {
  const thisReducer =
    process.env.NODE_ENV === 'development' ? logger(userReducer) : userReducer
  const [state, dispatch] = React.useReducer(thisReducer, {
    isAuthenticated: !!localStorage.getItem('id_token'),
    isLoading: false,
    activeTabId: 0,
    error: ''
  })

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  )
}

export function useUserState () {
  const context = React.useContext(UserStateContext)
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider')
  }
  return context
}

export function useUserDispatch () {
  const context = React.useContext(UserDispatchContext)
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider')
  }
  return context
}

export async function loginUser (dispatch, username, password) {
  dispatch({ type: userActions.LOGIN_REQUEST })
  try {
    const uri = '/identity/auth/login'
    const result = await postRequest(uri, { username, password })
    const response = await result.json()
    if (result.status === 200) {
      const token = response.data.accessToken
      localStorage.setItem('id_token', token)
      dispatch({ type: userActions.LOGIN_SUCCESS, payload: token })
    } else {
      dispatch({ type: userActions.LOGIN_FAILURE, payload: response.message })
    }
  } catch (err) {
    dispatch({ type: userActions.LOGIN_FAILURE, payload: 'Login failed.' })
  }
}

export async function signupUser (dispatch, name, email, password) {
  dispatch({ type: userActions.SIGN_UP_REQUEST })
  try {
    const uri = '/identity/auth/sign-up'
    const result = await postRequest(uri, { name, email, password })
    const response = await result.json()

    if (result.status === 200) {
      dispatch({ type: userActions.SIGN_UP_SUCCESS })
    } else {
      dispatch({ type: userActions.SIGN_UP_FAILURE, payload: response.message })
    }
  } catch (err) {
    dispatch({ type: userActions.SIGN_UP_FAILURE, payload: 'Signup failed.' })
  }
}

export function setActiveTabId (dispatch, activeTabId) {
  dispatch({ type: userActions.SET_ACTIVE_TAB_ID, payload: activeTabId })
}

export function signOut (dispatch, history) {
  localStorage.removeItem('id_token')
  dispatch({ type: userActions.SIGN_OUT_SUCCESS })
  history.push('/login')
}
