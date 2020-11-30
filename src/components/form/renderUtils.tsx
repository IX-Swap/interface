import React from 'react'
import { QueryStatus } from 'react-query'

export const LOADING_TEXT = 'loading...'
export const ERROR_TEXT = 'error...'

export const queryStatusRenderer = (
  status: QueryStatus
): JSX.Element | undefined => {
  if (status === 'loading') {
    return <div>{LOADING_TEXT}</div>
  }

  if (status === 'error') {
    return <div>{ERROR_TEXT}</div>
  }

  return undefined
}
