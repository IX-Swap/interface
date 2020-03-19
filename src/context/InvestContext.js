import React, { useMemo } from 'react'
import logger from 'use-reducer-logger'
import { getRequest, putRequest, postRequest } from './httpRequests'

// constants
const StateContext = React.createContext()
const DispatchContext = React.createContext()

const actions = {
  GET_INVEST_REQUEST: 'GET_INVEST_REQUEST',
  GET_INVEST_SUCCESS: 'GET_INVEST_SUCCESS',
  GET_INVEST_FAILURE: 'GET_INVEST_FAILURE',
  SAVE_INVEST_REQUEST: 'SAVE_INVEST_REQUEST',
  SAVE_INVEST_SUCCESS: 'SAVE_INVEST_SUCCESS',
  SAVE_INVEST_FAILURE: 'SAVE_INVEST_FAILURE'
}

export const INVEST_STATUS = {
  INIT: 'INIT',
  IDLE: 'IDLE',
  GETTING: 'GETTING',
  SAVING: 'SAVING'
}

const STATUS = INVEST_STATUS

const initialState = {
  investments: {},
  status: STATUS.INIT,
  shouldCreateNew: false,
  error: {
    save: null,
    get: null
  }
}

// reducer
export function investReducer (state, { type, payload }) {
  switch (type) {
    case actions.GET_INVEST_REQUEST:
      return {
        ...state,
        status: STATUS.GETTING,
        error: { ...state.error, get: null }
      }
    case actions.GET_INVEST_SUCCESS:
      return {
        ...state,
        status: STATUS.IDLE,
        invest: payload.invest,
        shouldCreateNew: payload.shouldCreateNew
      }
    case actions.GET_INVEST_FAILURE:
      return {
        ...state,
        status: STATUS.IDLE,
        error: { ...state.error, get: payload }
      }
    case actions.SAVE_INVEST_REQUEST:
      return {
        ...state,
        status: STATUS.SAVING,
        error: { ...state.error, save: null }
      }
    case actions.SAVE_INVEST_SUCCESS:
      return { ...state, status: STATUS.IDLE, invest: payload }
    case actions.SAVE_INVEST_FAILURE:
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
export async function getInvest (dispatch) {
  dispatch({ type: actions.GET_INVEST_REQUEST })

  try {
    const uri = '/issuance/deals'
    const result = await getRequest(uri)
    const response = await result.json()
    if (result.status === 200) {
      const invest = response.data || {}
      const shouldCreateNew = !response.data
      dispatch({
        type: actions.GET_INVEST_SUCCESS,
        payload: { invest, shouldCreateNew }
      })
    } else {
      dispatch({ type: actions.GET_INVEST_FAILURE, payload: response.message })
      throw new Error(response.message)
    }
  } catch (err) {
    const errMsg = err.message || err.toString() || 'Loading profile failed.'
    dispatch({ type: actions.GET_INVEST_FAILURE, payload: errMsg })
    throw new Error(errMsg)
  }
}

export async function saveInvest (dispatch, deal, shouldCreateNew) {
  dispatch({ type: actions.SAVE_INVEST_REQUEST })

  try {
    const uri = '/issuance/deals'
    const result = shouldCreateNew
      ? await postRequest(uri, deal)
      : await putRequest(uri, deal)
    const response = await result.json()
    if (result.status === 200) {
      const payload = response.data || {}
      dispatch({ type: actions.SAVE_INVEST_SUCCESS, payload })
    } else {
      dispatch({ type: actions.SAVE_INVEST_FAILURE, payload: response.message })
      throw new Error(response.message)
    }
  } catch (err) {
    const errMsg = err.message || err.toString() || 'Saving deal failed.'
    dispatch({ type: actions.SAVE_INVEST_FAILURE, payload: errMsg })
    throw new Error(errMsg)
  }
}
