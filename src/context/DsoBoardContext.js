import React from 'react'
import logger from 'use-reducer-logger'
import config from './config'

const DsoBoardStateContext = React.createContext()
const DsoBoardDispatchContext = React.createContext()

export function dsoBoardReducer (state, action) {
  switch(action.type) {
    case 'GET_DSOLIST_REQUEST':
      return { ...state, isLoading: true }
    case 'GET_DSOLIST_SUCCESS':
      return { ...state, isLoading: false, list: action.payload }
    case 'GET_DSOLIST_FAILURE': 
      return { ...state, isLoading: false, list: [], error: action.payload }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export function DsoBoardProvider ({ children }) {
  const thisReducer = process.env.NODE_ENV === 'development'
    ? logger(dsoBoardReducer)
    : dsoBoardReducer
  const [state, dispatch] = React.useReducer(thisReducer, {
    isLoading: false,
    list: []
  })

  return (
    <DsoBoardStateContext.Provider value={state}>
      <DsoBoardDispatchContext.Provider value={dispatch}>
        {children}
      </DsoBoardDispatchContext.Provider>
    </DsoBoardStateContext.Provider>
  )
}

export function dsoBoardState () {
  const context = React.useContext(DsoBoardStateContext)
  if (context === undefined) {
    throw new Error('dosBoardState must be used within a DsoBoardProvider')
  }
  return context
}

export function dsoBoardDispatch () {
  const context = React.useContext(DsoBoardDispatchContext)
  if (context === undefined){
    throw new Error('dsoBoardDispatch must be used within a DsoBoardProvider')
  }
}

// $$$$$$$$$$$$$$$$$$$$$$$$$$$$

export async function getDsoList (dispatch) {
  dispatch({ type: GET_DSOLIST_REQUEST })

  try {
    const result = await fetch(`${config.apiUrl}/issuance`)
  } catch(err) {
    dispatch({ type: 'GET_DSOLIST_FAILURE', payload: 'Failed to get DSO list.'})
  }
}