import React from 'react'
import { useStyles } from 'app/pages/authorizer/components/styles'
import { Typography } from '@mui/material'
import classNames from 'classnames'

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
