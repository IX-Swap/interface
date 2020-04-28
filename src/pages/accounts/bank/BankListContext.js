import React from 'react'
import logger from 'use-reducer-logger'
import { getRequest } from '../../../context/httpRequests'

const BankListStateContext = React.createContext()
const BankListDispatchContext = React.createContext()

export const getBankActions = {
  BANK_GET_REQUEST: 'BANK_GET_REQUEST',
  BANK_GET_SUCCESS: 'BANK_GET_SUCCESS',
  BANK_GET_FAILURE: 'BANK_GET_FAILURE'
}

const initialState = {
  isLoading: false,
  success: false,
  error: null,
  message: null,
  data: []
}

export function listBankReducer (state, action) {
  switch (action.type) {
    case getBankActions.BANK_GET_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: false,
        error: null,
        message: null,
        data: []
      }
    case getBankActions.BANK_GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
        message: action.payload.message,
        data: action.payload.data
      }
    case getBankActions.BANK_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        success: false,
        error: action.payload.message,
        message: null,
        data: []
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export function BankListProvider ({ children }) {
  const thisReducer =
    process.env.NODE_ENV === 'development'
      ? logger(listBankReducer)
      : listBankReducer
  const [state, dispatch] = React.useReducer(thisReducer, initialState)
  return (
    <BankListStateContext.Provider value={state}>
      <BankListDispatchContext.Provider value={dispatch}>
        {children}
      </BankListDispatchContext.Provider>
    </BankListStateContext.Provider>
  )
}

export function useBankListState () {
  const context = React.useContext(BankListStateContext)
  if (context === undefined)
    throw new Error(
      'useWalletCreateState must be called in a WalletCreateProvider'
    )
  return context
}

export function useBankListDispatch () {
  const context = React.useContext(BankListDispatchContext)
  if (context === undefined)
    throw new Error(
      'useWalletCreateDispatch must be called within a WalletCreateProvider'
    )
  return context
}

export async function listBankAccount (dispatch) {
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
