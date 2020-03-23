import React, { useMemo } from 'react'
import logger from 'use-reducer-logger'
import { getRequest, putRequest, postRequest } from './httpRequests'

// constants
const StateContext = React.createContext()
const DispatchContext = React.createContext()

const actions = {
  GET_DEALS_REQUEST: 'GET_DEALS_REQUEST',
  GET_DEALS_SUCCESS: 'GET_DEALS_SUCCESS',
  GET_DEALS_FAILURE: 'GET_DEALS_FAILURE',
  GET_OFFERING_REQUEST: 'GET_OFFERING_REQUEST',
  GET_OFFERING_SUCCESS: 'GET_OFFERING_SUCCESS',
  GET_OFFERING_FAILURE: 'GET_OFFERING_FAILURE'
}

export const INVEST_STATUS = {
  INIT: 'INIT',
  IDLE: 'IDLE',
  GETTING: 'GETTING',
  SAVING: 'SAVING'
}

const STATUS = INVEST_STATUS

const initialState = {
  deals: {},
  offering: {},
  status: STATUS.INIT,
  error: {
    save: null,
    get: null
  }
}

// reducer
export function investReducer (state, { type, payload }) {
  switch (type) {
    case actions.GET_DEALS_REQUEST:
      return {
        ...state,
        status: STATUS.GETTING,
        error: { ...state.error, get: null }
      }
    case actions.GET_DEALS_SUCCESS:
      return {
        ...state,
        status: STATUS.IDLE,
        deals: payload.deals
      }
    case actions.GET_DEALS_FAILURE:
      return {
        ...state,
        status: STATUS.IDLE,
        error: { ...state.error, get: payload }
      }
    case actions.GET_OFFERING_REQUEST:
      return {
        ...state,
        status: STATUS.SAVING,
        error: { ...state.error, save: null }
      }
    case actions.GET_OFFERING_SUCCESS:
      return { ...state, status: STATUS.IDLE, offering: payload.offering }
    case actions.GET_OFFERING_FAILURE:
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
export async function getDeals (dispatch) {
  dispatch({ type: actions.GET_DEALS_REQUEST })

  try {
    const uri = '/issuance/deals'
    const result = await getRequest(uri)
    const response = await result.json()
    if (result.status === 200) {
      const deals = response.data || {}
      dispatch({
        type: actions.GET_DEALS_SUCCESS,
        payload: { deals }
      })
    } else {
      dispatch({ type: actions.GET_DEALS_FAILURE, payload: response.message })
      throw new Error(response.message)
    }
  } catch (err) {
    const errMsg = err.message || err.toString() || 'Loading deals failed.'
    dispatch({ type: actions.GET_DEALS_FAILURE, payload: errMsg })
    throw new Error(errMsg)
  }
}

export async function getOffering (dispatch, dealId) {
  dispatch({ type: actions.GET_OFFERING_REQUEST })

  try {
    const uri = `issuance/deals/${dealId}}/offering-terms`
    const result = await getRequest(uri)
    const response = await result.json()
    if (result.status === 200) {
      const offering = response.data || {}
      dispatch({
        type: actions.GET_OFFERING_SUCCESS,
        payload: { offering }
      })
    } else {
      dispatch({
        type: actions.GET_OFFERING_FAILURE,
        payload: response.message
      })
      throw new Error(response.message)
    }
  } catch (err) {
    const errMsg = err.message || err.toString() || 'Load offering failed.'
    dispatch({ type: actions.GET_OFFERING_FAILURE, payload: errMsg })
    throw new Error(errMsg)
  }
}
// export async function saveDeal (dispatch, deal, shouldCreateNew) {
//   dispatch({ type: actions.SAVE_INVEST_REQUEST })

//   try {
//     const uri = '/issuance/deals'
//     const result = shouldCreateNew
//       ? await postRequest(uri, deal)
//       : await putRequest(uri, deal)
//     const response = await result.json()
//     if (result.status === 200) {
//       const payload = response.data || {}
//       dispatch({ type: actions.SAVE_INVEST_SUCCESS, payload })
//     } else {
//       dispatch({ type: actions.SAVE_INVEST_FAILURE, payload: response.message })
//       throw new Error(response.message)
//     }
//   } catch (err) {
//     const errMsg = err.message || err.toString() || 'Saving deal failed.'
//     dispatch({ type: actions.SAVE_INVEST_FAILURE, payload: errMsg })
//     throw new Error(errMsg)
//   }
// }
