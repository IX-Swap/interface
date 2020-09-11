import React from 'react'
import { QueryStatus } from 'react-query'

export const queryStatusRenderer = (
  status: QueryStatus
): JSX.Element | undefined => {
  if (status === 'loading') {
    return <div>loading...</div>
  }

  if (status === 'error') {
    return <div>error...</div>
  }
}
