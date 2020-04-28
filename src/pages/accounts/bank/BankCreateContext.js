import React from 'react'
import logger from 'use-reducer-logger'
import { postRequest } from '../../../context/httpRequests'

const BankCreateStateContext = React.createContext()
const BankCreateDispatchContext = React.createContext()

export const createBankActions = {
  BANK_CREATE_REQUEST: 'BANK_CREATE_REQUEST',
  BANK_CREATE_SUCCESS: 'BANK_CREATE_SUCCESS',
  BANK_CREATE_FAILURE: 'BANK_CREATE_FAILURE'
}

export function createBankReducer (state, action) {
  switch (action.type) {
    case createBankActions.BANK_CREATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: false,
        error: null,
        message: '',
        data: null
      }
    case createBankActions.BANK_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
        message: action.payload.message,
        data: action.payload.data
      }
    case createBankActions.BANK_CREATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        success: false,
        error: action.payload.message,
        message: null,
        data: null
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export function BankCreateProvider ({ children }) {
  const thisReducer =
    process.env.NODE_ENV === 'development'
      ? logger(createBankReducer)
      : createBankReducer
  const [state, dispatch] = React.useReducer(thisReducer, {
    isLoading: false,
    success: false,
    error: null,
    message: null,
    data: null
  })
  return (
    <BankCreateStateContext.Provider value={state}>
      <BankCreateDispatchContext.Provider value={dispatch}>
        {children}
      </BankCreateDispatchContext.Provider>
    </BankCreateStateContext.Provider>
  )
}

export function useBankCreateState () {
  const context = React.useContext(BankCreateStateContext)
  if (context === undefined)
    throw new Error(
      'useWalletCreateState must be called in a WalletCreateProvider'
    )
  return context
}

export function useBankCreateDispatch () {
  const context = React.useContext(BankCreateDispatchContext)
  if (context === undefined)
    throw new Error(
      'useWalletCreateDispatch must be called within a WalletCreateProvider'
    )
  return context
}

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
