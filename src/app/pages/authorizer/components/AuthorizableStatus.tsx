import React from 'react'
import { useStyles } from 'app/pages/authorizer/components/styles'
import { Typography } from '@material-ui/core'
import classNames from 'classnames'

interface AuthorizableStatusProps {
  status?: string
  compact?: boolean
  isNewTheme?: boolean
}

export const AuthorizableStatus: React.FC<AuthorizableStatusProps> = props => {
  const { status, compact = true, isNewTheme = false } = props
  const classes = useStyles()

  switch (status) {
    case 'Approved':
      return (
        <Typography
          className={classNames(classes.authStatus, classes.approved, {
            [classes.compact]: compact,
            [classes.authStatusNewTheme]: isNewTheme,
            [classes.approvedNewTheme]: isNewTheme
          })}
        >
          {compact ? 'A' : 'Approved'}
        </Typography>
      )
    case 'Rejected':
      return (
        <Typography
          className={classNames(classes.authStatus, classes.rejected, {
            [classes.compact]: compact,
            [classes.authStatusNewTheme]: isNewTheme,
            [classes.rejectedNewTheme]: isNewTheme
          })}
        >
          {compact ? 'R' : 'Rejected'}
        </Typography>
      )
    case 'Submitted':
      return (
        <Typography
          className={classNames(classes.authStatus, classes.unauthorized, {
            [classes.compact]: compact,
            [classes.authStatusNewTheme]: isNewTheme,
            [classes.submittedNewTheme]: isNewTheme
          })}
        >
          {compact ? 'S' : 'Submitted'}
        </Typography>
      )
    case 'Closed':
      return (
        <Typography
          className={classNames(classes.authStatus, classes.unauthorized, {
            [classes.compact]: compact,
            [classes.authStatusNewTheme]: isNewTheme,
            [classes.unauthorizedNewTheme]: isNewTheme
          })}
        >
          {compact ? 'C' : 'Closed'}
        </Typography>
      )
    default:
      return (
        <Typography
          className={classNames(classes.authStatus, classes.unauthorized, {
            [classes.compact]: compact,
            [classes.authStatusNewTheme]: isNewTheme,
            [classes.unauthorizedNewTheme]: isNewTheme
          })}
        >
          {compact ? 'D' : 'Draft'}
        </Typography>
      )
  }
}
