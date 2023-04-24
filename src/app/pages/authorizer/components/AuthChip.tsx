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
  isNewKYCTheme?: boolean
  newKYC: string
}

export const AuthChip = ({
  classname,
  newTheme,
  status,
  compactChar,
  compact,
  isNewTheme,
  isNewKYCTheme,
  newKYC
}: AuthChipProps) => {
  const classes = useStyles()
  return (
    <Typography
      className={classNames(classes.authStatus, classname, {
        [classes.compact]: compact,
        [classes.authStatusNewTheme]: isNewTheme,
        [newTheme]: isNewTheme,
        [classes.kycTheme]: isNewKYCTheme,
        [newKYC]: isNewKYCTheme
      })}
    >
      {compact ? compactChar : status}
    </Typography>
  )
}
