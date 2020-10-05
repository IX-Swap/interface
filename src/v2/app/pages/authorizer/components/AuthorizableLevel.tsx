import React from 'react'
import { useStyles } from 'v2/app/pages/authorizer/components/styles'
import { Typography } from '@material-ui/core'
import classNames from 'classnames'

interface AuthorizableLevelProps {
  level?: string
  compact?: boolean
}

export const AuthorizableLevel: React.FC<AuthorizableLevelProps> = props => {
  const { level, compact = true } = props
  const classes = useStyles()

  if (level === undefined) {
    return null
  }

  const text = compact ? `${level[0]}${level[level.length - 1]}` : level

  switch (level) {
    case 'Level 1':
      return (
        <Typography
          className={classNames(classes.authStatus, classes.approved, {
            [classes.compact]: compact
          })}
        >
          {text}
        </Typography>
      )
    case 'Level 2':
      return (
        <Typography
          className={classNames(classes.authStatus, classes.rejected, {
            [classes.compact]: compact
          })}
        >
          {text}
        </Typography>
      )
    case 'Level 3':
      return (
        <Typography
          className={classNames(classes.authStatus, classes.unauthorized, {
            [classes.compact]: compact
          })}
        >
          {text}
        </Typography>
      )
    default:
      return null
  }
}
