import React from 'react'
import logger from '../v2/helpers/logger'
import { getRequest, putRequest } from '../services/httpRequests'

// constants
const StateContext = React.createContext()
const DispatchContext = React.createContext()

const actions = {
  GET_ACCREDITATION_REQUEST: 'GET_ACCREDITATION_REQUEST',
  GET_ACCREDITATION_SUCCESS: 'GET_ACCREDITATION_SUCCESS',
  GET_ACCREDITATION_FAILURE: 'GET_ACCREDITATION_FAILURE',
  SAVE_ACCREDITATION_REQUEST: 'SAVE_ACCREDITATION_REQUEST',
  SAVE_ACCREDITATION_SUCCESS: 'SAVE_ACCREDITATION_SUCCESS',
  SAVE_ACCREDITATION_FAILURE: 'SAVE_ACCREDITATION_FAILURE'
}

export const ACCREDITATION_STATUS = {
  INIT: 'INIT',
  IDLE: 'IDLE',
  GETTING: 'GETTING',
  SAVING: 'SAVING'
}

const STATUS = ACCREDITATION_STATUS

const initialState = {
  accreditation: {},
  status: STATUS.INIT,
  error: {
    save: null,
    get: null
  }
}

// reducer
export function accreditationReducer (state, { type, payload }) {
  switch (type) {
    case actions.GET_ACCREDITATION_REQUEST:
      return {
        ...state,
        status: STATUS.GETTING,
        error: { ...state.error, get: null }
      }
    case actions.GET_ACCREDITATION_SUCCESS:
      return { ...state, status: STATUS.IDLE, accreditation: payload }
    case actions.GET_ACCREDITATION_FAILURE:
      return {
        ...state,
        status: STATUS.IDLE,
        error: { ...state.error, get: payload }
      }
    case actions.SAVE_ACCREDITATION_REQUEST:
      return {
        ...state,
        status: STATUS.SAVING,
        error: { ...state.error, save: null }
      }
    case actions.SAVE_ACCREDITATION_SUCCESS:
      return { ...state, status: STATUS.IDLE, accreditation: payload }
    case actions.SAVE_ACCREDITATION_FAILURE:
      return {
        ...state,
        status: STATUS.IDLE,
        error: { ...state.error, save: payload }
      }
    default:
      throw new Error(`Unhandled action type: ${type}`)
  }
}

// context and hooks
export function AccreditationProvider ({ children }) {
  const thisReducer =
    process.env.NODE_ENV === 'development'
      ? logger(accreditationReducer)
      : accreditationReducer

  const [state, dispatch] = React.useReducer(thisReducer, initialState)

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export function useAccreditationState () {
  const context = React.useContext(StateContext)
  if (context === undefined) {
    throw new Error(
      'useAccreditationState must be used within a AccreditationProvider'
    )
  }
  return context
}

export function useAccreditationDispatch () {
  const context = React.useContext(DispatchContext)
  if (context === undefined) {
    throw new Error(
      'useAccreditationDispatch must be used within a AccreditationProvider'
    )
  }
  return context
}

// actions
export async function getAccreditation (dispatch) {
  dispatch({ type: actions.GET_ACCREDITATION_REQUEST })

  try {
    const uri = '/identity/profile/individual/accreditations'
    const result = await getRequest(uri)
    const response = await result.json()
    if (result.status === 200) {
      const accreditation = response.data || {}
      dispatch({
        type: actions.GET_ACCREDITATION_SUCCESS,
        payload: accreditation
      })
    } else {
      // Forgive 404 because it is expected to be 404 before inputting some data
      if (result.status === 404) {
        return dispatch({
          type: actions.GET_ACCREDITATION_SUCCESS,
          payload: {}
        })
      }

      throw new Error(response.message)
    }
  } catch (err) {
    const errMsg = err.message || err.toString() || 'Loading profile failed.'
    dispatch({ type: actions.GET_ACCREDITATION_FAILURE, payload: errMsg })
    throw new Error(errMsg)
  }
}

export async function saveAccreditation (dispatch, accreditation) {
  dispatch({ type: actions.SAVE_ACCREDITATION_REQUEST })

  try {
    const uri = '/identity/profile/individual/accreditations'
    const result = await putRequest(uri, accreditation)
    const response = await result.json()
    if (result.status === 200) {
      const payload = response.data || {}
      dispatch({ type: actions.SAVE_ACCREDITATION_SUCCESS, payload })
    } else {
      throw new Error(response.message)
    }
  } catch (err) {
    const errMsg = err.message || err.toString() || 'Saving profile failed.'
    dispatch({ type: actions.SAVE_ACCREDITATION_FAILURE, payload: errMsg })
    throw new Error(errMsg)
  }
}
