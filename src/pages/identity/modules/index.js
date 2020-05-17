// @flow
import React, { useMemo } from 'react';
import type { Node } from 'react';
import logger from 'use-reducer-logger';
import { identityReducer } from './reducers';
import { initialState } from './state';

const StateContext = React.createContext<any>();
const DispatchContext = React.createContext();

export const IdentityProvider = ({ children }: { children: Node }) => {
  const thisReducer = useMemo(
    () =>
      process.env.NODE_ENV === 'development'
        ? logger(identityReducer)
        : identityReducer,
    []
  );

  const [state, dispatch] = React.useReducer<any, any>(
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
};

export const useIdentityState = () => {
  const context = React.useContext(StateContext);
  if (context === undefined) {
    throw new Error('useIdentityState must be used within a IdentityProvider');
  }

  return context;
};

export const useIdentityDispatch = () => {
  const context = React.useContext(DispatchContext);
  if (context === undefined) {
    throw new Error(
      'useIdentityDispatch must be used within a IdentityProvider'
    );
  }

  return context;
};
