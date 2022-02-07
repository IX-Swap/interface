import React from 'react'
import { useStyles } from 'app/pages/authorizer/components/styles'
import { Typography } from '@mui/material'
import classNames from 'classnames'

interface AuthorizableStatusProps {
  status?: string
  compact?: boolean
  isNewTheme?: boolean
}

export interface AuthChipProps {
  classname: string
  newTheme: string
  status?: string
  compactChar: string
  compact: boolean
  isNewTheme: boolean
}

export const AuthChip = ({
  classname,
  newTheme,
  status,
  compactChar,
  compact,
  isNewTheme
}: AuthChipProps) => {
  const classes = useStyles()
  return (
    <Typography
      className={classNames(classes.authStatus, classname, {
        [classes.compact]: compact,
        [classes.authStatusNewTheme]: isNewTheme,
        [newTheme]: isNewTheme
      })}
    >
      {compact ? compactChar : status}
    </Typography>
  )
}

export const AuthorizableStatus: React.FC<AuthorizableStatusProps> = props => {
  const { status, compact = true, isNewTheme = false } = props
  const classes = useStyles()
  const compactStatus = status?.split(' ').pop()?.[0].toUpperCase() ?? ''

  switch (status) {
    case 'Approved':
    case 'Funds transferred':
    case 'DEPLOYED':
      return (
        <AuthChip
          {...props}
          compact={compact}
          isNewTheme={isNewTheme}
          compactChar={compactStatus}
          classname={classes.approved}
          newTheme={classes.approvedNewTheme}
        />
      )
    case 'Rejected':
    case 'Funds on hold':
    case 'Failed':
      return (
        <AuthChip
          {...props}
          compact={compact}
          isNewTheme={isNewTheme}
          compactChar={compactStatus}
          classname={classes.rejected}
          newTheme={classes.rejectedNewTheme}
        />
      )

    case 'Submitted':
    case 'Closed':
    case 'Settlement in Progress':
    case 'Draft':
      return (
        <AuthChip
          {...props}
          compact={compact}
          isNewTheme={isNewTheme}
          compactChar={compactStatus}
          classname={classes.unauthorized}
          newTheme={classes.submittedNewTheme}
        />
      )

    case 'Open':
    case 'Not funded':
    case 'PENDING':
      return (
        <AuthChip
          {...props}
          compact={compact}
          isNewTheme={isNewTheme}
          compactChar={compactStatus}
          classname={classes.open}
          newTheme={classes.openNewTheme}
        />
      )

    default:
      return <></>
  }
}
