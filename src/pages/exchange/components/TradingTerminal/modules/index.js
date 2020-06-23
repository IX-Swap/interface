// @flow
import React from 'react'
import type { Node } from 'react'
import logger from 'use-reducer-logger'
import { marketReducer } from './reducers'
import { initialState } from './state'
import { generateModule } from 'context/base/withPagination'
import type { MarketListState } from './types'

const MarketListStateContext = React.createContext<MarketListState>(initialState)
const MarketListDispatchContext = React.createContext()

const { Provider, useState, useDispatch, statusList } = generateModule<MarketListState>(
  'marketList'
)

export function MarketListingState () {
  const context = React.useContext(MarketListStateContext)
  if (context === undefined) {
    throw new Error('MarketListingState must be used within a MarketListProver')
  }

  return context
}

export function useMarketListDispatch () {
  const context = React.useContext(MarketListDispatchContext)
  if (context === undefined) {
    throw new Error('useMarketListDispatch must be used within a MarketListProver')
  }

  return context
}

export function MarketListProvider ({ children }: { children: Node }) {
  const thisReducer =
    process.env.NODE_ENV === 'development' ? logger(marketReducer) : marketReducer
  const [state, dispatch] = React.useReducer<MarketListState, MarketListState>(
    thisReducer,
    initialState
  )

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
