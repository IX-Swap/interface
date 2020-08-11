import React from 'react'
import logger from '../v2/helpers/logger'
import { postRequest } from '../services/httpRequests'

const TokenDeployStateContext = React.createContext()
const TokenDeployDispatchContext = React.createContext()

export const tokenDeployActions = {
  TOKEN_DEPLOY_REQUEST: 'TOKEN_DEPLOY_REQUEST',
  TOKEN_DEPLOY_SUCCESS: 'TOKEN_DEPLOY_SUCCESS',
  TOKEN_DEPLOY_FAILURE: 'TOKEN_DEPLOY_FAILURE'
}

export function tokenDeployReducer (state, action) {
  switch (action.type) {
    case tokenDeployActions.TOKEN_DEPLOY_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: false,
        error: null,
        message: 'Deploying Contract...',
        data: null
      }
    case tokenDeployActions.TOKEN_DEPLOY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
        message: action.payload.message,
        data: action.payload.data
      }
    case tokenDeployActions.TOKEN_DEPLOY_FAILURE:
      return {
        ...state,
        isLoading: false,
        success: false,
        error: action.payload.message,
        message: null,
        data: null
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export function TokenDeployProvider ({ children }) {
  const thisReducer =
    process.env.NODE_ENV === 'development'
      ? logger(tokenDeployReducer)
      : tokenDeployReducer
  const [state, dispatch] = React.useReducer(thisReducer, {
    isLoading: false,
    success: false,
    error: null,
    message: null,
    data: null
  })
  return (
    <TokenDeployStateContext.Provider value={state}>
      <TokenDeployDispatchContext.Provider value={dispatch}>
        {children}
      </TokenDeployDispatchContext.Provider>
    </TokenDeployStateContext.Provider>
  )
}

export function useTokenDeployState () {
  const context = React.useContext(TokenDeployStateContext)
  if (context === undefined) {
    throw new Error(
      'useTokenDeployState ' + 'must be called in a ' + 'TokenDeployProvider'
    )
  }
  return context
}

export function useTokenDeployDispatch () {
  const context = React.useContext(TokenDeployDispatchContext)
  if (context === undefined) {
    throw new Error(
      'useTokenDeployDispatch ' +
        'must be called within a ' +
        'TokenDeployProvider'
    )
  }
  return context
}

async function deployToken (dispatch, name, symbol, decimals) {
  dispatch({ type: tokenDeployActions.TOKEN_DEPLOY_REQUEST })

  try {
    const uri = '/blockchain/contracts/deploy'
    const result = postRequest(uri, { name, symbol, decimals })
    const response = await result.json()

    if (result.status === 200) {
      dispatch({
        type: tokenDeployActions.TOKEN_DEPLOY_SUCCESS,
        payload: response
      })
    } else {
      dispatch({
        type: tokenDeployActions.TOKEN_DEPLOY_FAILURE,
        payload: response
      })
    }
  } catch (err) {
    dispatch({
      type: tokenDeployActions.TOKEN_DEPLOY_FAILURE,
      payload: { message: 'Failed to deploy the token contract.' }
    })
  }
}

export { deployToken }
