import React from 'react'
import { useStyles } from 'v2/app/pages/authorizer/components/styles'
import { Typography } from '@material-ui/core'
import classNames from 'classnames'

interface AuthorizableStatusProps {
  status: string
  compact?: boolean
}

export const AuthorizableStatus: React.FC<AuthorizableStatusProps> = props => {
  const { status, compact = true } = props
  const classes = useStyles()

  switch (status) {
    case 'Approved':
      return (
        <Typography
          className={classNames(classes.authStatus, classes.approved, {
            [classes.compact]: compact
          })}
        >
          {compact ? 'A' : 'Approved'}
        </Typography>
      )
    case 'Rejected':
      return (
        <Typography
          className={classNames(classes.authStatus, classes.rejected, {
            [classes.compact]: compact
          })}
        >
          {compact ? 'R' : 'Rejected'}
        </Typography>
      )
    default:
      return (
        <Typography
          className={classNames(classes.authStatus, classes.unauthorized, {
            [classes.compact]: compact
          })}
        >
          {compact ? 'S' : 'Submitted'}
        </Typography>
      )
  }
}
