import React, { useMemo } from 'react'
import logger from 'use-reducer-logger'
import { getRequest } from './httpRequests'

const StateContext = React.createContext()
const DispatchContext = React.createContext()

const actions = {
  GET_ASSETS_REQUEST: 'GET_ASSETS_REQUEST',
  GET_ASSETS_SUCCESS: 'GET_ASSETS_SUCCESS',
  GET_ASSETS_FAILURE: 'GET_ASSETS_FAILURE'
}

export const ASSETS_STATUS = {
  INIT: 'INIT',
  IDLE: 'IDLE',
  GETTING: 'GETTING',
  SAVING: 'SAVING'
}

const STATUS = ASSETS_STATUS

const initialState = {
  assets: [],
  status: STATUS.INIT,
  error: {
    GET_ASSETS: null
  }
}

// reducer
export function assetsReducer (state, { type, payload }) {
  switch (type) {
    case actions.GET_ASSETS_REQUEST:
      return {
        ...state,
        status: STATUS.GETTING,
        error: { ...state.error, GET_ASSETS: null }
      }
    case actions.GET_ASSETS_SUCCESS:
      return {
        ...state,
        assets: payload,
        status: STATUS.IDLE,
        error: { ...state.error, GET_ASSETS: null }
      }
    case actions.GET_ASSETS_FAILURE:
      return {
        ...state,
        status: STATUS.IDLE,
        error: { ...state.error, GET_ASSETS: payload }
      }

    default:
      break
  }
}

// context and hooks
export function AssetsProvider ({ children }) {
  const thisReducer = useMemo(
    () =>
      process.env.NODE_ENV === 'development'
        ? logger(assetsReducer)
        : assetsReducer,
    []
  )

  const [state, dispatch] = React.useReducer(thisReducer, initialState)

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export function useAssetsState () {
  const context = React.useContext(StateContext)
  if (context === undefined) {
    throw new Error('useAssetsState must be used within a AssetsProvider')
  }
  return context
}

export function useAssetsDispatch () {
  const context = React.useContext(DispatchContext)
  if (context === undefined) {
    throw new Error('useAssetsDispatch must be used within a AssetsProvider')
  }
  return context
}

export async function getAssets (dispatch) {
  try {
    dispatch({ type: actions.GET_ASSETS_REQUEST })
    const uri = '/custody/asset'
    const result = await getRequest(uri)
    if (result.status === 200) {
      const response = await result.json()
      dispatch({ type: actions.GET_ASSETS_SUCCESS, payload: response.data })
    } else {
      dispatch({ type: actions.GET_ASSETS_FAILURE, payload: result.message })
    }
  } catch (err) {
    console.log(err)
    dispatch({ type: actions.GET_ASSETS_FAILURE })
  }
}
