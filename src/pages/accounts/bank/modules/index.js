// @flow
import React from 'react';
import logger from 'use-reducer-logger';
import type { Node } from 'react';
import usersListReducer from './reducers';
import { initialState } from './state';

import type { BanksListState } from './types';

const StateContext = React.createContext<BanksListState>(initialState);
const DispatchContext = React.createContext();

/**
 * Exported State and Dispatch
 */
export function useBanksListState() {
  const context = React.useContext(StateContext);
  if (context === undefined) {
    throw new Error('useBanksListState must be called in a BanksListProvider');
  }

  return context;
}

export function useBanksListDispatch() {
  const context = React.useContext(DispatchContext);
  if (context === undefined) {
    throw new Error(
      'useBanksListDispatch must be called within a BanksListProvider'
    );
  }

  return context;
}

export function BanksListProvider({ children }: { children?: Node }) {
  const thisReducer =
    process.env.NODE_ENV === 'development'
      ? logger(usersListReducer)
      : usersListReducer;
  const [state, dispatch] = React.useReducer<BanksListState, BanksListState>(
    thisReducer,
    initialState
  );
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
