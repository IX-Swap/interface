import React from 'react'
import logger from '../v2/helpers/logger'
import { getRequest } from '../services/httpRequests'

const BlockInfoStateContext = React.createContext()
const BlockInfoDispatchContext = React.createContext()

export const blockInfoActions = {
  BLOCK_INFO_REQUEST: 'BLOCK_INFO_REQUEST',
  BLOCK_INFO_SUCCESS: 'BLOCK_INFO_SUCCESS',
  BLOCK_INFO_FAILURE: 'BLOCK_INFO_FAILURE'
}

export function blockInfoReducer (state, action) {
  switch (action.type) {
    case blockInfoActions.BLOCK_INFO_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: false,
        error: null,
        message: 'Loading',
        data: null
      }
    case blockInfoActions.BLOCK_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
        message: action.payload.message,
        data: action.payload.data
      }
    case blockInfoActions.BLOCK_INFO_FAILURE:
      return {
        ...state,
        isLoading: false,
        success: false,
        error: action.payload.message,
        messsage: null,
        data: []
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export function BlockInfoProvider ({ children }) {
  const thisReducer =
    process.env.NODE_ENV === 'development'
      ? logger(blockInfoReducer)
      : blockInfoReducer
  const [state, dispatch] = React.useReducer(thisReducer, {
    isLoading: false,
    success: false,
    error: null,
    message: null,
    data: null
  })
  return (
    <BlockInfoStateContext.Provider value={state}>
      <BlockInfoDispatchContext.Provider value={dispatch}>
        {children}
      </BlockInfoDispatchContext.Provider>
    </BlockInfoStateContext.Provider>
  )
}

export function useBlockInfoState () {
  const context = React.useContext(BlockInfoStateContext)
  if (context === undefined) {
    throw new Error('blockInfoState must be used within a BlockInfoProvider')
  }
  return context
}

export function useBlockInfoDispatch () {
  const context = React.useContext(BlockInfoDispatchContext)
  if (context === undefined) {
    throw new Error(
      'BlockInfoDispatch must be used within a BlockInfoProvider'
    )
  }
  return context
}

async function getBlockInfo (dispatch, blockNumber) {
  dispatch({ type: blockInfoActions.BLOCK_INFO_REQUEST })
  try {
    const uri = `/blockchain/explorer/blocks/${blockNumber}`
    const result = await getRequest(uri)
    const response = await result.json()
    if (result.status === 200) {
      dispatch({
        type: blockInfoActions.BLOCK_INFO_SUCCESS,
        payload: response
      })
    } else {
      dispatch({
        type: blockInfoActions.BLOCK_INFO_FAILURE,
        payload: response.message || { message: 'Unable to get block info.' }
      })
    }
  } catch (err) {
    dispatch({
      type: blockInfoActions.BLOCK_INFO_FAILURE,
      payload: { messaage: 'Failed to get block info.' }
    })
  }
}

export { getBlockInfo }
