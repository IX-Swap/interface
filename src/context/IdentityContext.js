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
  SAVE_IDENTITY_FAILURE: 'SAVE_IDENTITY_FAILURE',
  SAVE_FILE_REQUEST: 'SAVE_FILE_REQUEST',
  SAVE_FILE_SUCCESS: 'SAVE_FILE_SUCCESS',
  SAVE_FILE_FAILURE: 'SAVE_FILE_FAILURE'
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
  files: [],
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
      return {
        ...state,
        status: STATUS.IDLE,
        identity: payload.identity,
        files: payload.files,
        shouldCreateNew: payload.shouldCreateNew
      }
    case actions.GET_IDENTITY_FAILURE:
      return { ...state, status: STATUS.IDLE, error: { ...state.error, get: payload } }

    case actions.SAVE_FILE_REQUEST:
    case actions.SAVE_IDENTITY_REQUEST:
      return { ...state, status: STATUS.SAVING, error: { ...state.error, save: null } }
    case actions.SAVE_IDENTITY_SUCCESS:
      return { ...state, status: STATUS.IDLE, identity: payload, shouldCreateNew: false }
    case actions.SAVE_IDENTITY_FAILURE:
    case actions.SAVE_FILE_FAILURE:
      return { ...state, status: STATUS.IDLE, error: { ...state.error, save: payload } }

    case actions.SAVE_FILE_SUCCESS:
      return { ...state, status: STATUS.IDLE, files: [...state.files, payload] }

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
    const individualUri = '/identity/profile/individual'
    const filesUri = '/dataroom'

    const results = await Promise.all([
      getRequest(individualUri),
      getRequest(filesUri)
    ])

    const resps = await Promise.all(results.map(r => r.json()))

    const areAllResultsOk = results.every(r => r.status === 200)
    if (areAllResultsOk) {
      const identity = resps[0].data || {}
      const shouldCreateNew = !resps[0].data
      const files = resps[1].data

      dispatch({ type: actions.GET_IDENTITY_SUCCESS, payload: {
        identity,
        shouldCreateNew,
        files
      } })
    } else {
      const message = resps.find(r => r.status !== 200).message

      dispatch({ type: actions.GET_IDENTITY_FAILURE, payload: message })
      throw new Error(message)
    }
  } catch (err) {
    const errMsg = err.message || err.toString() || 'Loading profile failed.'
    dispatch({ type: actions.GET_IDENTITY_FAILURE, payload: errMsg })
    throw new Error(errMsg)
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
      throw new Error(response.message)
    }
  } catch (err) {
    const errMsg = err.message || err.toString() || 'Saving profile failed.'
    dispatch({ type: actions.SAVE_IDENTITY_FAILURE, payload: errMsg })
    throw new Error(errMsg)
  }
}

export async function saveFinancials (dispatch, identity) {
  dispatch({ type: actions.SAVE_IDENTITY_REQUEST })

  try {
    const uri = '/identity/profile/individual/financials'
    const result = await putRequest(uri, identity)
    const response = await result.json()
    if (result.status === 200) {
      const payload = response.data || {}
      dispatch({ type: actions.SAVE_IDENTITY_SUCCESS, payload })
    } else {
      dispatch({ type: actions.SAVE_IDENTITY_FAILURE, payload: response.message })
      throw new Error(response.message)
    }
  } catch (err) {
    const errMsg = err.message || err.toString() || 'Saving profile failed.'
    dispatch({ type: actions.SAVE_IDENTITY_FAILURE, payload: errMsg })
    throw new Error(errMsg)
  }
}

export async function saveFile (dispatch, { title, file, remarks }) {
  dispatch({ type: actions.SAVE_FILE_REQUEST })

  try {
    const formData = new FormData()

    formData.append('title', title)
    formData.append('document', file)
    formData.append('remarks', remarks)
    formData.append('type', 'identity')

    const uri = '/dataroom'
    const result = await postRequest(uri, formData)

    const response = await result.json()
    if (result.status === 200) {
      const payload = response.data
      dispatch({ type: actions.SAVE_FILE_SUCCESS, payload })
    } else {
      dispatch({ type: actions.SAVE_FILE_FAILURE, payload: response.message })
      throw new Error(response.message)
    }
  } catch (err) {
    const errMsg = err.message || err.toString() || 'Upload failed.'
    dispatch({ type: actions.SAVE_FILE_FAILURE, payload: errMsg })
    throw new Error(errMsg)
  }
}
