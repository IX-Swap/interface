import React, { useMemo } from 'react'
import logger from 'use-reducer-logger'
import { getRequest, putRequest, postRequest } from './httpRequests'

// constants
const StateContext = React.createContext()
const DispatchContext = React.createContext()

const actions = {
  GET_DSOLIST_REQUEST: 'GET_DSOLIST_REQUEST',
  GET_DSOLIST_SUCCESS: 'GET_DSOLIST_SUCCESS',
  GET_DSOLIST_FAILURE: 'GET_DSOLIST_FAILURE',
  GET_DSO_REQUEST: 'GET_DSO_REQUEST',
  GET_DSO_SUCCESS: 'GET_DSO_SUCCESS',
  GET_DSO_FAILURE: 'GET_DSO_FAILURE'
}

export const INVEST_STATUS = {
  INIT: 'INIT',
  IDLE: 'IDLE',
  GETTING: 'GETTING',
  SAVING: 'SAVING'
}

const STATUS = INVEST_STATUS

const initialState = {
  dsoList: [],
  dsoActiveViewIndex: 0,
  status: STATUS.INIT,
  error: {
    save: null,
    get: null
  }
}

// reducer
export function investReducer (state, { type, payload }) {
  switch (type) {
    case actions.GET_DSOLIST_REQUEST:
      return {
        ...state,
        status: STATUS.GETTING,
        error: { ...state.error, get: null }
      }
    case actions.GET_DSOLIST_SUCCESS:
      return {
        ...state,
        status: STATUS.IDLE,
        dsoList: payload.dsoList
      }
    case actions.GET_DSOLIST_FAILURE:
      return {
        ...state,
        status: STATUS.IDLE,
        error: { ...state.error, get: payload }
      }
    case actions.GET_DSO_REQUEST:
      return {
        ...state,
        status: STATUS.SAVING,
        error: { ...state.error, save: null }
      }
    case actions.GET_DSO_SUCCESS:
      return {
        ...state,
        status: STATUS.IDLE,
        offering: payload.dsoActiveViewIndex
      }
    case actions.GET_DSO_FAILURE:
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
export function InvestProvider ({ children }) {
  const thisReducer = useMemo(
    () =>
      process.env.NODE_ENV === 'development'
        ? logger(investReducer)
        : investReducer,
    []
  )

  const [state, dispatch] = React.useReducer(thisReducer, initialState)

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export function useInvestState () {
  const context = React.useContext(StateContext)
  if (context === undefined) {
    throw new Error('useInvestState must be used within a InvestProvider')
  }
  return context
}

export function useInvestDispatch () {
  const context = React.useContext(DispatchContext)
  if (context === undefined) {
    throw new Error('useInvestDispatch must be used within a InvestProvider')
  }
  return context
}

// actions
export async function getDsoList (dispatch) {
  dispatch({ type: actions.GET_DSOLIST_REQUEST })

  try {
    const uri = '/issuance/dso'
    const result = await getRequest(uri)
    const response = await result.json()
    if (result.status === 200) {
      const dsoList = response.data || []
      dispatch({
        type: actions.GET_DSOLIST_SUCCESS,
        payload: { dsoList }
      })
    } else {
      dispatch({ type: actions.GET_DSOLIST_FAILURE, payload: response.message })
      throw new Error(response.message)
    }
  } catch (err) {
    const errMsg = err.message || err.toString() || 'Loading dso list failed.'
    dispatch({ type: actions.GET_DSOLIST_FAILURE, payload: errMsg })
    throw new Error(errMsg)
  }
}

// export async function setActiveDso (dispatch, dsoId) {
//   dispatch({ type: actions.GET_DSOLIST_REQUEST })

//   try {
//     if (result.status === 200) {
//       const offering = response.data || {}
//       dispatch({
//         type: actions.GET_DSOLIST_SUCCESS,
//         payload: { dsoActiveViewIndex }
//       })
//     } else {
//       dispatch({
//         type: actions.GET_DSOLIST_FAILURE,
//         payload: response.message
//       })
//       throw new Error(response.message)
//     }
//   } catch (err) {
//     const errMsg = err.message || err.toString() || 'Loading dso failed.'
//     dispatch({ type: actions.GET_DSOLIST_FAILURE, payload: errMsg })
//     throw new Error(errMsg)
//   }
// }
