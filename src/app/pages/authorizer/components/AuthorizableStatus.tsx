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
    case 'Open':
      return (
        <Typography
          className={classNames(classes.authStatus, classes.open, {
            [classes.compact]: compact,
            [classes.authStatusNewTheme]: isNewTheme,
            [classes.openNewTheme]: isNewTheme
          })}
        >
          {compact ? 'O' : 'Open'}
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
    /**
       * NOT_FUNDED: 'Not funded',
      FUNDS_ON_HOLD: 'Funds on hold',
      SETTLEMENT_IN_PROGRESS: 'Settlement in Progress',
      FUNDS_TRANSFERRED: 'Funds transferred',
      REJECTED: 'Rejected'
       */
    case 'Not funded':
      return (
        <Typography
          className={classNames(classes.authStatus, classes.open, {
            [classes.compact]: compact,
            [classes.authStatusNewTheme]: isNewTheme,
            [classes.openNewTheme]: isNewTheme
          })}
        >
          {compact ? 'N' : 'Not funded'}
        </Typography>
      )
    case 'Funds on hold':
      return (
        <Typography
          className={classNames(classes.authStatus, classes.rejected, {
            [classes.compact]: compact,
            [classes.authStatusNewTheme]: isNewTheme,
            [classes.rejectedNewTheme]: isNewTheme
          })}
        >
          {compact ? 'H' : 'Funds on hold'}
        </Typography>
      )

    case 'Settlement in Progress':
      return (
        <Typography
          className={classNames(classes.authStatus, classes.unauthorized, {
            [classes.compact]: compact,
            [classes.authStatusNewTheme]: isNewTheme,
            [classes.submittedNewTheme]: isNewTheme
          })}
        >
          {compact ? 'S' : 'Settlement in Progress'}
        </Typography>
      )

    case 'Funds transferred':
      return (
        <Typography
          className={classNames(classes.authStatus, classes.approved, {
            [classes.compact]: compact,
            [classes.authStatusNewTheme]: isNewTheme,
            [classes.approvedNewTheme]: isNewTheme
          })}
        >
          {compact ? 'T' : 'Funds transferred'}
        </Typography>
      )

    case 'Draft':
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

    default:
      return <></>
  }
}
