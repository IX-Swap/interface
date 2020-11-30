import React from 'react'
import { Typography } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { Authorizable } from 'v2/types/authorizer'
import { privateClassNames } from 'v2/helpers/classnames'

export interface RejectionMessageProps {
  data: Authorizable | undefined
}

export const RejectionMessage = (props: RejectionMessageProps) => {
  const { data } = props

  if (data === undefined) {
    return null
  }

  const sorted =
    data.authorizations?.sort((a, b) =>
      a.timestamp < b.timestamp ? -1 : a.timestamp > b.timestamp ? 1 : 0
    ) ?? []
  const lastItem = sorted[sorted.length - 1]

  if (
    lastItem === undefined ||
    data.status === 'Submitted' ||
    lastItem.status === 'Approved'
  ) {
    return null
  }

  return (
    <Alert
      severity='error'
      style={{ minWidth: 400, marginBottom: 20 }}
      className={privateClassNames()}
    >
      <AlertTitle>{lastItem.status}</AlertTitle>
      {lastItem.sharedWithUser && <Typography>{lastItem.comment}</Typography>}
    </Alert>
  )
}
