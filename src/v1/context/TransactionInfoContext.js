import React from 'react'
import logger from '../../v2/helpers/logger'
import { getRequest } from '../services/httpRequests'

const TransactionInfoStateContext = React.createContext()
const TransactionInfoDispatchContext = React.createContext()

export const transactionInfoActions = {
  TX_INFO_REQUEST: 'TX_INFO_REQUEST',
  TX_INFO_SUCCESS: 'TX_INFO_SUCCESS',
  TX_INFO_FAILURE: 'TX_INFO_FAILURE'
}

export function transactionInfoReducer (state, action) {
  switch (action.type) {
    case transactionInfoActions.TX_INFO_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: false,
        error: null,
        message: 'Loading',
        data: null
      }
    case transactionInfoActions.TX_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
        message: action.payload.message,
        data: action.payload.data
      }
    case transactionInfoActions.TX_INFO_FAILURE:
      return {
        ...state,
        isLoading: false,
        success: false,
        error: action.payload.message,
        messsage: null,
        data: []
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export function TransactionInfoProvider ({ children }) {
  const thisReducer =
    process.env.NODE_ENV === 'development'
      ? logger(transactionInfoReducer)
      : transactionInfoReducer
  const [state, dispatch] = React.useReducer(thisReducer, {
    isLoading: false,
    success: false,
    error: null,
    message: null,
    data: null
  })
  return (
    <TransactionInfoStateContext.Provider value={state}>
      <TransactionInfoDispatchContext.Provider value={dispatch}>
        {children}
      </TransactionInfoDispatchContext.Provider>
    </TransactionInfoStateContext.Provider>
  )
}

export function useTransactionInfoState () {
  const context = React.useContext(TransactionInfoStateContext)
  if (context === undefined) {
    throw new Error(
      'transactionInfoState must be used within a TransactionInfoProvider'
    )
  }
  return context
}

export function useTransactionInfoDispatch () {
  const context = React.useContext(TransactionInfoDispatchContext)
  if (context === undefined) {
    throw new Error(
      'transactionInfoDispatch must be used within a TransactionInfoProvider'
    )
  }
  return context
}

async function getTransactionInfo (dispatch, txInfo) {
  console.log(txInfo)
  dispatch({ type: transactionInfoActions.TX_INFO_REQUEST })
  try {
    let uri, result
    if (txInfo.account) {
      uri = '/blockchain/explorer/transactions'
      result = await getRequest(uri, txInfo)
    } else {
      uri = `/blockchain/explorer/transactions/${txInfo}`
      result = await getRequest(uri)
    }
    const response = await result.json()
    if (result.status === 200) {
      dispatch({
        type: transactionInfoActions.TX_INFO_SUCCESS,
        payload: response
      })
    } else {
      dispatch({
        type: transactionInfoActions.TX_INFO_FAILURE,
        payload: {
          message: 'Unable to get transaction info.'
        }
      })
    }
  } catch (err) {
    console.log(err)
    dispatch({
      type: transactionInfoActions.TX_INFO_FAILURE,
      payload: {
        message: 'Failed to get transaction info.'
      }
    })
  }
}

export { getTransactionInfo }
