import React from 'react'
import { Typography } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { Authorizable } from 'v2/types/authorizer'

export interface RejectionMessageProps {
  data: Authorizable['authorizations']
}

export const RejectionMessage = (props: RejectionMessageProps) => {
  const { data } = props

  if (data === undefined) {
    return null
  }

  const sorted = data.sort((a, b) =>
    a.timestamp < b.timestamp ? -1 : a.timestamp > b.timestamp ? 1 : 0
  )
  const lastItem = sorted[sorted.length - 1]

  if (lastItem === undefined || lastItem.status === 'Approved') {
    return null
  }

  return (
    <Alert severity='error' style={{ minWidth: 400, marginBottom: 20 }}>
      <AlertTitle>{lastItem.status}</AlertTitle>
      {lastItem.sharedWithUser && <Typography>{lastItem.comment}</Typography>}
    </Alert>
  )
}
