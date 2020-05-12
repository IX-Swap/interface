import React from 'react'
import logger from 'use-reducer-logger'
import { getRequest, postRequest } from './httpRequests'

// constants
const StateContext = React.createContext()
const DispatchContext = React.createContext()

const ACCOUNT_STATUS = {
  INIT: 'INIT',
  IDLE: 'IDLE',
  GETTING: 'GETTING',
  SAVING: 'SAVING'
}

const initialState = {
  status: ACCOUNT_STATUS.INIT,
  error: null,
  message: null,
  data: null,
  banks: null
}

export const createBankActions = {
  BANK_CREATE_REQUEST: 'BANK_CREATE_REQUEST',
  BANK_CREATE_SUCCESS: 'BANK_CREATE_SUCCESS',
  BANK_CREATE_FAILURE: 'BANK_CREATE_FAILURE'
}

export const getBankActions = {
  BANK_GET_REQUEST: 'BANK_GET_REQUEST',
  BANK_GET_SUCCESS: 'BANK_GET_SUCCESS',
  BANK_GET_FAILURE: 'BANK_GET_FAILURE'
}

export const getAssetsActions = {
  ASSETS_GET_REQUEST: 'ASSETS_GET_REQUEST',
  ASSETS_GET_SUCCESS: 'ASSETS_GET_SUCCESS',
  ASSETS_GET_FAILURE: 'ASSETS_GET_FAILURE'
}

/**
 * Exported State and Dispatch
 */
export function useAccountState () {
  const context = React.useContext(StateContext)
  if (context === undefined)
    throw new Error('useAccountState must be called in a AccountProvider')
  return context
}

export function useAccountDispatch () {
  const context = React.useContext(DispatchContext)
  if (context === undefined)
    throw new Error(
      'useAccountDispatch must be called within a AccountProvider'
    )
  return context
}

export function accountReducer (state, action) {
  switch (action.type) {
    case getBankActions.BANK_GET_REQUEST:
      return {
        ...state,
        status: ACCOUNT_STATUS.GETTING,
        error: null,
        message: null,
        data: []
      }
    case getBankActions.BANK_GET_SUCCESS:
      return {
        ...state,
        status: ACCOUNT_STATUS.IDLE,
        error: null,
        message: action.payload.message,
        banks: action.payload.data
      }
    case getBankActions.BANK_GET_FAILURE:
      return {
        ...state,
        status: ACCOUNT_STATUS.IDLE,
        error: action.payload.message,
        message: null,
        data: []
      }
    case createBankActions.BANK_CREATE_REQUEST:
      return {
        ...state,
        status: ACCOUNT_STATUS.GETTING,
        error: null,
        message: null,
        data: null
      }
    case createBankActions.BANK_CREATE_SUCCESS:
      return {
        ...state,
        status: ACCOUNT_STATUS.IDLE,
        error: null,
        message: action.payload.message,
        data: action.payload.data
      }
    case createBankActions.BANK_CREATE_FAILURE:
      return {
        ...state,
        status: ACCOUNT_STATUS.IDLE,
        error: action.payload.message,
        message: null,
        data: null
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export function AccountProvider ({ children }) {
  const thisReducer =
    process.env.NODE_ENV === 'development'
      ? logger(accountReducer)
      : accountReducer
  const [state, dispatch] = React.useReducer(thisReducer, initialState)
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

/**
 * DISPATCHES
 */
export async function createBankAccount (dispatch, payload) {
  dispatch({ type: createBankActions.BANK_CREATE_REQUEST })

  try {
    const uri = '/custody/bank-account'
    const result = await postRequest(uri, payload)
    const response = await result.json()

    if (result.status === 200) {
      dispatch({
        type: createBankActions.BANK_CREATE_SUCCESS,
        payload: response
      })
    } else {
      dispatch({
        type: createBankActions.BANK_CREATE_FAILURE,
        payload: response
      })
    }
  } catch (err) {
    dispatch({
      type: createBankActions.BANK_CREATE_FAILURE,
      payload: { message: 'Failed to create bank accounts.' }
    })
  }
}

export async function getAssetsInfo (dispatch) {
  dispatch({ type: getAssetsActions.ASSETS_GET_REQUEST })

  try {
    const uri = '/custody/asset'
    const result = await getRequest(uri)
    const response = await result.json()

    if (result.status === 200) {
      dispatch({
        type: getAssetsActions.ASSETS_GET_SUCCESS,
        payload: response
      })
    } else {
      dispatch({
        type: getAssetsActions.ASSETS_GET_FAILURE,
        payload: response
      })
    }
  } catch (err) {
    dispatch({
      type: getAssetsActions.ASSETS_GET_FAILURE,
      payload: { message: 'Failed to fetch assets information.' }
    })
  }
}

export async function getBankAccounts (dispatch) {
  dispatch({ type: getBankActions.BANK_GET_REQUEST })

  try {
    const uri = '/custody/bank-account'
    const result = await getRequest(uri)
    const response = await result.json()
    if (result.status === 200) {
      dispatch({
        type: getBankActions.BANK_GET_SUCCESS,
        payload: response
      })
    } else {
      dispatch({
        type: getBankActions.BANK_GET_FAILURE,
        payload: response
      })
    }
  } catch (err) {
    dispatch({
      type: getBankActions.BANK_GET_FAILURE,
      payload: { message: 'Failed to fetch bank accounts.' }
    })
  }
}
