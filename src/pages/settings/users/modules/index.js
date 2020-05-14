import React from 'react';
import logger from 'use-reducer-logger';
import usersListReducer from './reducers';
import { initialState } from './state';

const StateContext = React.createContext();
const DispatchContext = React.createContext();

/**
 * Exported State and Dispatch
 */
export function useUsersListState() {
  const context = React.useContext(StateContext);
  if (context === undefined)
    throw new Error('useAccountState must be called in a UserListProvider');
  return context;
}

export function useUsersListDispatch() {
  const context = React.useContext(DispatchContext);
  if (context === undefined)
    throw new Error(
      'useAccountDispatch must be called within a UserListProvider'
    );
  return context;
}

export function UsersListProvider({ children }) {
  const thisReducer =
    process.env.NODE_ENV === 'development'
      ? logger(usersListReducer)
      : usersListReducer;
  const [state, dispatch] = React.useReducer(thisReducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
