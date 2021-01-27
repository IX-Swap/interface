import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import { green } from '@material-ui/core/colors'

export interface PasswordValidationProps {
  label: string
  inValid: boolean
}

export const PasswordValidation = ({
  label,
  inValid
}: PasswordValidationProps) => {
  const colorProps = {
    style: inValid ? undefined : { color: green[500] },
    color: inValid ? 'error' : undefined
  }

  return (
    <Grid container spacing={1}>
      <Grid item>
        {inValid ? (
          <CloseIcon
            fontSize='small'
            style={colorProps.style}
            color={colorProps.color as any}
          />
        ) : (
          <CheckIcon
            fontSize='small'
            style={colorProps.style}
            color={colorProps.color as any}
          />
        )}
      </Grid>
      <Grid item>
        <Typography
          variant='body2'
          style={colorProps.style}
          color={colorProps.color as any}
        >
          {label}
        </Typography>
      </Grid>
    </Grid>
  )
}
