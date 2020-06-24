// @flow
import React from 'react'
import logger from 'use-reducer-logger'
import type { Node } from 'react'
import generateInitialState from './state'
import generateReducers from './reducers'
import generateActionsAndStatus from './types'
import type { BaseStateWithPagination, GenericStatus } from './types'

export function generateModule<X> (
  name: string,
  additionalReducer?: (
    statusTypes: GenericStatus,
    state: BaseStateWithPagination<X>,
    load: any
  ) => BaseStateWithPagination<X>
) {
  const sName = name.charAt(0).toUpperCase() + name.slice(1)
  const initialState = generateInitialState<X>()
  const { actionTypes, status } = generateActionsAndStatus(name)

  const StateContext = React.createContext<BaseStateWithPagination<X>>(
    initialState
  )
  const DispatchContext = React.createContext()

  const reducer = generateReducers<X>(actionTypes, status, additionalReducer)

  function useState (): BaseStateWithPagination<X> {
    const context = React.useContext<BaseStateWithPagination<X>>(StateContext)
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

  function Provider ({ children }: { children?: Node }) {
    const thisReducer = process.env.NODE_ENV === 'development' ? logger(reducer) : reducer

    const [state, dispatch] = React.useReducer<any, any>(
      thisReducer,
      initialState
    )

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
