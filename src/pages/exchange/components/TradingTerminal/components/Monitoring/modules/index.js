//
import React from 'react'

import logger from '../../../../../../../v2/helpers/logger'
import { monitoringReducer } from './reducers'
import { initialState } from './state'

const MonitoringStateContext = React.createContext(initialState)
const MonitoringDispatchContext = React.createContext()

export function MonitoringState () {
  const context = React.useContext(MonitoringStateContext)
  if (context === undefined) {
    throw new Error('Monitoring must be used within a MonitoringProvider')
  }

  return context
}

export function useMonitoringDispatch () {
  const context = React.useContext(MonitoringDispatchContext)
  if (context === undefined) {
    throw new Error(
      'useMonitoringDispatch must be used within a MonitoringProvider'
    )
  }

  return context
}

export function MonitoringProvider ({ children }) {
  const thisReducer =
    process.env.NODE_ENV === 'development'
      ? logger(monitoringReducer)
      : monitoringReducer
  const [state, dispatch] = React.useReducer(thisReducer, initialState)

  return (
    <MonitoringStateContext.Provider value={state}>
      <MonitoringDispatchContext.Provider value={dispatch}>
        {children}
      </MonitoringDispatchContext.Provider>
    </MonitoringStateContext.Provider>
  )
}

export default {
  MonitoringProvider,
  useMonitoringDispatch,
  MonitoringState
}
