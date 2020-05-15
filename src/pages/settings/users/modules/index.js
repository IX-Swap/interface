// @flow
import React from 'react';
import logger from 'use-reducer-logger';
import type { Node } from 'react';
import usersListReducer from './reducers';
import { initialState } from './state';

import type { UsersListState } from './types';

const StateContext = React.createContext<UsersListState>(initialState);
const DispatchContext = React.createContext();

/**
 * Exported State and Dispatch
 */
export function useUsersListState() {
  const context = React.useContext(StateContext);
  if (context === undefined) {
    throw new Error('useUsersListState must be called in a UserListProvider');
  }

  return context;
}

export function useUsersListDispatch() {
  const context = React.useContext(DispatchContext);
  if (context === undefined) {
    throw new Error(
      'useUsersListDispatch must be called within a UserListProvider'
    );
  }

  return context;
}

export function UsersListProvider({ children }: { children?: Node }) {
  const thisReducer =
    process.env.NODE_ENV === 'development'
      ? logger(usersListReducer)
      : usersListReducer;
  const [state, dispatch] = React.useReducer<UsersListState, UsersListState>(
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
