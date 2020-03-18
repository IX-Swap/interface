import React, { useMemo } from 'react'
import logger from 'use-reducer-logger'
import { getRequest, putRequest, postRequest } from './httpRequests'

// constants
const StateContext = React.createContext()
const DispatchContext = React.createContext()

const actions = {
  GET_IDENTITY_REQUEST: 'GET_IDENTITY_REQUEST',
  GET_IDENTITY_SUCCESS: 'GET_IDENTITY_SUCCESS',
  GET_IDENTITY_FAILURE: 'GET_IDENTITY_FAILURE',
  SAVE_IDENTITY_REQUEST: 'SAVE_IDENTITY_REQUEST',
  SAVE_IDENTITY_SUCCESS: 'SAVE_IDENTITY_SUCCESS',
  SAVE_IDENTITY_FAILURE: 'SAVE_IDENTITY_FAILURE'
}

export const IDENTITY_STATUS = {
  INIT: 'INIT',
  IDLE: 'IDLE',
  GETTING: 'GETTING',
  SAVING: 'SAVING'
}

const STATUS = IDENTITY_STATUS

const initialState = {
  identity: {},
  status: STATUS.INIT,
  shouldCreateNew: false,
  error: {
    save: null,
    get: null
  }
}

// reducer
export function identityReducer (state, { type, payload }) {
  switch (type) {
    case actions.GET_IDENTITY_REQUEST:
      return { ...state, status: STATUS.GETTING, error: { ...state.error, get: null } }
    case actions.GET_IDENTITY_SUCCESS:
      return { ...state, status: STATUS.IDLE, identity: payload.identity, shouldCreateNew: payload.shouldCreateNew }
    case actions.GET_IDENTITY_FAILURE:
      return { ...state, status: STATUS.IDLE, error: { ...state.error, get: payload } }
    case actions.SAVE_IDENTITY_REQUEST:
      return { ...state, status: STATUS.SAVING, error: { ...state.error, save: null } }
    case actions.SAVE_IDENTITY_SUCCESS:
      return { ...state, status: STATUS.IDLE, identity: payload }
    case actions.SAVE_IDENTITY_FAILURE:
      return { ...state, status: STATUS.IDLE, error: { ...state.error, save: payload } }
    default:
      throw new Error(`Unhandled action type: ${type}`)
  }
}

// context and hooks
export function IdentityProvider ({ children }) {
  const thisReducer = useMemo(() =>
    process.env.NODE_ENV === 'development' ? logger(identityReducer) : identityReducer,
    [])

  const [state, dispatch] = React.useReducer(thisReducer, initialState)

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export function useIdentityState () {
  const context = React.useContext(StateContext)
  if (context === undefined) {
    throw new Error('useIdentityState must be used within a IdentityProvider')
  }
  return context
}

export function useIdentityDispatch () {
  const context = React.useContext(DispatchContext)
  if (context === undefined) {
    throw new Error('useIdentityDispatch must be used within a IdentityProvider')
  }
  return context
}

// actions
export async function getIdentity (dispatch) {
  dispatch({ type: actions.GET_IDENTITY_REQUEST })

  try {
    const uri = '/identity/profile/individual'
    const result = await getRequest(uri)
    const response = await result.json()
    if (result.status === 200) {
      const identity = response.data || {}
      const shouldCreateNew = !response.data
      dispatch({ type: actions.GET_IDENTITY_SUCCESS, payload: { identity, shouldCreateNew } })
    } else {
      dispatch({ type: actions.GET_IDENTITY_FAILURE, payload: response.message })
    }
  } catch (err) {
    dispatch({ type: actions.GET_IDENTITY_FAILURE, payload: 'Loading profile failed.' })
  }
}

export async function saveIdentity (dispatch, identity, shouldCreateNew) {
  dispatch({ type: actions.SAVE_IDENTITY_REQUEST })

  try {
    const uri = '/identity/profile/individual'
    const result = shouldCreateNew ? await postRequest(uri, identity) : await putRequest(uri, identity)
    const response = await result.json()
    if (result.status === 200) {
      const payload = response.data || {}
      dispatch({ type: actions.SAVE_IDENTITY_SUCCESS, payload })
    } else {
      dispatch({ type: actions.SAVE_IDENTITY_FAILURE, payload: response.message })
    }
  } catch (err) {
    dispatch({ type: actions.SAVE_IDENTITY_FAILURE, payload: 'Loading profile failed.' })
  }
}
