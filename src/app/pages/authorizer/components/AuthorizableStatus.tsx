import React from 'react'
import { useStyles } from 'app/pages/authorizer/components/styles'
import { Typography } from '@material-ui/core'
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

  switch (status) {
    case 'Approved':
      return (
        <AuthChip
          {...props}
          compact={compact}
          isNewTheme={isNewTheme}
          compactChar={'A'}
          classname={classes.approved}
          newTheme={classes.approvedNewTheme}
        />
      )
    case 'Rejected':
      return (
        <AuthChip
          {...props}
          compact={compact}
          isNewTheme={isNewTheme}
          compactChar={'R'}
          classname={classes.rejected}
          newTheme={classes.rejectedNewTheme}
        />
      )

    case 'Submitted':
      return (
        <AuthChip
          {...props}
          compact={compact}
          isNewTheme={isNewTheme}
          compactChar={'S'}
          classname={classes.unauthorized}
          newTheme={classes.submittedNewTheme}
        />
      )

    case 'Open':
      return (
        <AuthChip
          {...props}
          compact={compact}
          isNewTheme={isNewTheme}
          compactChar={'O'}
          classname={classes.open}
          newTheme={classes.openNewTheme}
        />
      )

    case 'Closed':
      return (
        <AuthChip
          {...props}
          compact={compact}
          isNewTheme={isNewTheme}
          compactChar={'C'}
          classname={classes.unauthorized}
          newTheme={classes.unauthorizedNewTheme}
        />
      )

    case 'Not funded':
      return (
        <AuthChip
          {...props}
          compact={compact}
          isNewTheme={isNewTheme}
          compactChar={'N'}
          classname={classes.open}
          newTheme={classes.openNewTheme}
        />
      )

    case 'Settlement in Progress':
      return (
        <AuthChip
          {...props}
          compact={compact}
          isNewTheme={isNewTheme}
          compactChar={'P'}
          classname={classes.unauthorized}
          newTheme={classes.submittedNewTheme}
        />
      )

    case 'Funds on hold':
      return (
        <AuthChip
          {...props}
          compact={compact}
          isNewTheme={isNewTheme}
          compactChar={'H'}
          classname={classes.rejected}
          newTheme={classes.rejectedNewTheme}
        />
      )

    case 'Funds transferred':
      return (
        <AuthChip
          {...props}
          compact={compact}
          isNewTheme={isNewTheme}
          compactChar={'T'}
          classname={classes.approved}
          newTheme={classes.approvedNewTheme}
        />
      )

    case 'Failed':
      return (
        <AuthChip
          {...props}
          compact={compact}
          isNewTheme={isNewTheme}
          compactChar={'F'}
          classname={classes.rejected}
          newTheme={classes.rejectedNewTheme}
        />
      )

    case 'Draft':
      return (
        <AuthChip
          {...props}
          compact={compact}
          isNewTheme={isNewTheme}
          compactChar={'T'}
          classname={classes.unauthorized}
          newTheme={classes.unauthorizedNewTheme}
        />
      )

    default:
      return <></>
  }
}
