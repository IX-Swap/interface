import React from 'react'
import logger from 'use-reducer-logger'
import { getRequest } from './httpRequests'

export const EtherBalanceStateContext = React.createContext()
export const EtherBalanceDispatchContext = React.createContext()

const etherBalanceActions = {
  ETHER_BALANCE_REQUEST: 'ETHER_BALANCE_REQUEST',
  ETHER_BALANCE_SUCCESS: 'ETHER_BALANCE_SUCCESS',
  ETHER_BALANCE_FAILURE: 'ETHER_BALANCE_FAILURE'
}

export function etherBalanceReducer (state, action) {
  switch (action.type) {
    case etherBalanceActions.ETHER_BALANCE_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: false,
        error: null,
        message: 'Requesting ether balance...',
        data: []
      }
    case etherBalanceActions.ETHER_BALANCE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
        message: action.payload.message,
        data: action.payload.data
      }
    case etherBalanceActions.ETHER_BALANCE_FAILURE:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: action.payload.message,
        message: null,
        data: []
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export function EtherBalanceProvider ({ children }) {
  const thisReducer =
    process.env.NODE_ENV === 'development'
      ? logger(etherBalanceReducer)
      : etherBalanceReducer
  const [state, dispatch] = React.useReducer(thisReducer, {
    isLoading: false,
    error: null,
    message: null,
    data: null
  })
  return (
    <EtherBalanceStateContext.Provider value={state}>
      <EtherBalanceDispatchContext.Provider value={dispatch}>
        {children}
      </EtherBalanceDispatchContext.Provider>
    </EtherBalanceStateContext.Provider>
  )
}

export function useEtherBalanceState () {
  const context = React.useContext(EtherBalanceStateContext)
  if (context === undefined)
    throw new Error(
      'useEtherBalanceState must be called in a EtherBalanceProvider'
    )
  return context
}

export function useEtherBalanceDispatch () {
  const context = React.useContext(EtherBalanceDispatchContext)
  if (context === undefined)
    throw new Error(
      'useEtherBalanceDispatch must be called within a EtherBalanceProvider'
    )
  return context
}

export async function getEtherBalance (dispatch, address) {
  dispatch({ type: etherBalanceActions.ETHER_BALANCE_REQUEST })
  try {
    const uri = `/blockchain/explorer/balances/${address}`
    const result = await getRequest(uri)
    const response = await result.json()
    if (result.status === 200) {
      dispatch({
        type: etherBalanceActions.ETHER_BALANCE_SUCCESS,
        payload: response
      })
    } else {
      dispatch({
        type: etherBalanceActions.ETHER_BALANCE_FAILURE,
        payload: response
      })
    }
  } catch (err) {
    dispatch({
      type: etherBalanceActions.ETHER_BALANCE_FAILURE,
      payload: { message: 'Failed to get ether balance.' }
    })
  }
}
