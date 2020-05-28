// @flow
import React, { useMemo } from 'react';
import type { Node } from 'react';
import logger from 'use-reducer-logger';
import { issuanceReducer } from './reducers';
import { initialState } from './state';

const StateContext = React.createContext<any>();
const DispatchContext = React.createContext();

export const IssuanceProvider = ({ children }: { children: Node }) => {
  const thisReducer = useMemo(
    () =>
      process.env.NODE_ENV === 'development'
        ? logger(issuanceReducer)
        : issuanceReducer,
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

export const useIssuanceState = () => {
  const context = React.useContext(StateContext);
  if (context === undefined) {
    throw new Error('useIssuanceState must be used within a IssuanceProvider');
  }

  return context;
};

export const useIssuanceDispatch = () => {
  const context = React.useContext(DispatchContext);
  if (context === undefined) {
    throw new Error(
      'useIssuanceDispatch must be used within a IssuanceProvider'
    );
  }

  return context;
};
