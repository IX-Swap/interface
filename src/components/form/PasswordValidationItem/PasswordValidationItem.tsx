import React from 'react'
import { Grid, Typography } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import useStyles from './PasswordValidationItem.style'

export interface PasswordValidationProps {
  label: string
  invalid: boolean
}

export const PasswordValidationItem = ({
  label,
  invalid
}: PasswordValidationProps) => {
  const classes = useStyles({ invalid })

  return (
    <Grid container spacing={1}>
      <Grid item>
        {invalid ? (
          <CloseIcon fontSize='small' className={classes.invalidIcon} />
        ) : (
          <CheckIcon fontSize='small' className={classes.validIcon} />
        )}
      </Grid>
      <Grid item>
        <Typography variant='body2' className={classes.text}>
          {label}
        </Typography>
      </Grid>
    </Grid>
  )
}
