//
import React from 'react'

import logger from '../../../../../../../../v2/helpers/logger'
import { postOrderReducer } from './reducers'
import { initialState } from './state'

const PostOrderStateContext = React.createContext(initialState)
const PostOrderDispatchContext = React.createContext()

export function PostOrderState () {
  const context = React.useContext(PostOrderStateContext)
  if (context === undefined) {
    throw new Error('PostOrderState must be used within a PostOrderProvider')
  }

  return context
}

export function usePostOrderDispatch () {
  const context = React.useContext(PostOrderDispatchContext)
  if (context === undefined) {
    throw new Error(
      'usePostOrderDispatch must be used within a PostOrderProvider'
    )
  }

  return context
}

export function PostOrderProvider ({ children }) {
  const thisReducer =
    process.env.NODE_ENV === 'development'
      ? logger(postOrderReducer)
      : postOrderReducer
  const [state, dispatch] = React.useReducer(thisReducer, initialState)

  return (
    <PostOrderStateContext.Provider value={state}>
      <PostOrderDispatchContext.Provider value={dispatch}>
        {children}
      </PostOrderDispatchContext.Provider>
    </PostOrderStateContext.Provider>
  )
}

export default {
  PostOrderProvider,
  usePostOrderDispatch,
  PostOrderState
}
