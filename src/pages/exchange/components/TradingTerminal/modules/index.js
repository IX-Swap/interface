//
import React from 'react'

import logger from '../../../../../v2/helpers/logger'
import { marketReducer } from './reducers'
import { initialState } from './state'
import { generateModule } from 'context/base/withPagination'

const MarketListStateContext = React.createContext(initialState)
const MarketListDispatchContext = React.createContext()

const { Provider, useState, useDispatch, statusList } = generateModule(
  'marketList'
)

export function MarketListingState () {
  const context = React.useContext(MarketListStateContext)
  if (context === undefined) {
    throw new Error(
      'MarketListingState must be used within a MarketListProver'
    )
  }

  return context
}

export function useMarketListDispatch () {
  const context = React.useContext(MarketListDispatchContext)
  if (context === undefined) {
    throw new Error(
      'useMarketListDispatch must be used within a MarketListProver'
    )
  }

  return context
}

export function MarketListProvider ({ children }) {
  const thisReducer =
    process.env.NODE_ENV === 'development'
      ? logger(marketReducer)
      : marketReducer
  const [state, dispatch] = React.useReducer(thisReducer, initialState)

  return (
    <MarketListStateContext.Provider value={state}>
      <MarketListDispatchContext.Provider value={dispatch}>
        {children}
      </MarketListDispatchContext.Provider>
    </MarketListStateContext.Provider>
  )
}

export default {
  useMarketListDispatch,
  MarketListingState,

  MarketProvider: Provider,
  MarketState: useState,
  useMarketDispatch: useDispatch,
  MARKET_LIST_STATUS: statusList
}
