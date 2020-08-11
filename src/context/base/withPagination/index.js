//
import React from 'react'
import logger from '../../../v2/helpers/logger'

import generateInitialState from './state'
import generateReducers from './reducers'

export function generateModule (name, additionalReducer) {
  const sName = name.charAt(0).toUpperCase() + name.slice(1)
  const initialState = generateInitialState()
  const { actionTypes, status } = generateActionsAndStatus(name)

  const StateContext = React.createContext(initialState)
  const DispatchContext = React.createContext()

  const reducer = generateReducers(actionTypes, status, additionalReducer)

  function useState () {
    const context = React.useContext(StateContext)
    if (context === undefined) {
      throw new Error(
        `use${sName}State must be used within a ${sName}Provider`
      )
    }

    return context
  }

  function useDispatch () {
    const context = React.useContext(DispatchContext)
    if (context === undefined) {
      throw new Error(
        `use${sName}Dispatch must be used within a ${sName}Provider`
      )
    }

    return context
  }

  function Provider ({ children }) {
    const thisReducer =
      process.env.NODE_ENV === 'development' ? logger(reducer) : reducer

    const [state, dispatch] = React.useReducer(thisReducer, initialState)

    return (
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          {children}
        </DispatchContext.Provider>
      </StateContext.Provider>
    )
  }

  return {
    useDispatch,
    useState,
    Provider,
    initialState,
    statusList: status
  }
}
