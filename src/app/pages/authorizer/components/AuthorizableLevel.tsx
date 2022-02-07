import React from 'react'
import { useStyles } from 'app/pages/authorizer/components/styles'
import { Typography } from '@mui/material'
import classNames from 'classnames'

export interface AuthorizableLevelProps {
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
          className={classNames(classes.authStatus, {
            [classes.compact]: compact
          })}
          style={{
            backgroundColor: '#FCF6E1',
            color: '#8B7E50',
            borderColor: '#D8C78A'
          }}
        >
          {text.toUpperCase()}
        </Typography>
      )
    case 'Level 2':
      return (
        <Typography
          className={classNames(classes.authStatus, {
            [classes.compact]: compact
          })}
          style={{
            backgroundColor: '#EAFBFC',
            color: '#75A0A3',
            borderColor: '#9CBFC1'
          }}
        >
          {text.toUpperCase()}
        </Typography>
      )
    case 'Level 3':
      return (
        <Typography
          className={classNames(classes.authStatus, {
            [classes.compact]: compact
          })}
          style={{
            backgroundColor: '#F9CFCF',
            color: '#AD7676',
            borderColor: '#CB9898'
          }}
        >
          {text.toUpperCase()}
        </Typography>
      )
    default:
      return null
  }
}
