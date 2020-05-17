// @flow
import React from 'react';
import type { Node } from 'react';
import logger from 'use-reducer-logger';
import { userReducer } from './reducers';
import { initialState } from './state';
import type { UserAuthState } from './types';

const UserStateContext = React.createContext<UserAuthState>(initialState);
const UserDispatchContext = React.createContext();

export function useUserState() {
  const context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }

  return context;
}

export function useUserDispatch() {
  const context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider');
  }

  return context;
}

export function UserProvider({ children }: { children: Node }) {
  const thisReducer =
    process.env.NODE_ENV === 'development' ? logger(userReducer) : userReducer;
  const [state, dispatch] = React.useReducer<UserAuthState, UserAuthState>(
    thisReducer,
    initialState
  );

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}
