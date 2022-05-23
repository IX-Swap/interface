import React, { useEffect, useState } from 'react'
import { Typography, Grid } from '@mui/material'
import { copyToClipboard } from 'helpers/clipboard'
import useStyles from './BackupKey.styles'

export interface BackupKeyProps {
  value: string
}

export const BackupKey = ({ value }: BackupKeyProps) => {
  const [copied, setCopied] = useState(false)
  const classes = useStyles({ copied })

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined
    if (copied) {
      timeout = setTimeout(() => setCopied(false), 3000)
    }
    return () => {
      if (timeout !== undefined) {
        clearTimeout(timeout)
      }
    }
  }, [copied])

  return (
    <Grid
      item
      container
      alignItems={'center'}
      className={classes.container}
      justifyContent={'space-between'}
    >
      <Grid item className={classes.keyBlock}>
        <Typography className={classes.key}>{value}</Typography>
      </Grid>
      <Grid item>
        <Typography
          variant={'body1'}
          className={classes.copyButton}
          onClick={() => {
            setCopied(true)
            copyToClipboard(value)
          }}
        >
          {copied ? 'Copied' : 'Copy'}
        </Typography>
      </Grid>
    </Grid>
  )
}
