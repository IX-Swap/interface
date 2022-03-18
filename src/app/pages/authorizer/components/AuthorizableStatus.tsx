import React from 'react'
import { useStyles } from 'app/pages/authorizer/components/styles'
import { AuthChip } from 'app/pages/authorizer/components/AuthChip'

interface AuthorizableStatusProps {
  status?: string
  compact?: boolean
  isNewTheme?: boolean
}

export const AuthorizableStatus: React.FC<AuthorizableStatusProps> = props => {
  const { status, compact = true, isNewTheme = false } = props
  const classes = useStyles()
  const compactStatus = status?.split(' ').pop()?.[0].toUpperCase() ?? ''

  switch (status) {
    case 'Approved':
    case 'Funds transferred':
    case 'DEPLOYED':
    case 'LOW':
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
    case 'HIGH':
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
    case 'MEDIUM':
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

    case 'UNKNOWN':
      return (
        <AuthChip
          {...props}
          compact={compact}
          isNewTheme={isNewTheme}
          compactChar={compactStatus}
          classname={classes.unknown}
          newTheme={classes.unknownNewTheme}
        />
      )

    default:
      return <></>
  }
}
