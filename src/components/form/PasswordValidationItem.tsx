import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import { green, red } from '@material-ui/core/colors'

export interface PasswordValidationProps {
  label: string
  invalid: boolean
}

export const PasswordValidationItem = ({
  label,
  invalid
}: PasswordValidationProps) => {
  const colorProps = {
    style: invalid ? { color: red[500] } : { color: green[500] }
  }

  return (
    <Grid container spacing={1}>
      <Grid item>
        {invalid ? (
          <CloseIcon fontSize='small' style={colorProps.style} />
        ) : (
          <CheckIcon fontSize='small' style={colorProps.style} />
        )}
      </Grid>
      <Grid item>
        <Typography variant='body2' style={colorProps.style}>
          {label}
        </Typography>
      </Grid>
    </Grid>
  )
}
