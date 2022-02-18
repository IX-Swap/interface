import React from 'react'
import { Grid, TextField, Typography } from '@mui/material'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import { Submit } from 'components/form/Submit'
import { renderPartOfEmail } from 'helpers/rendering'
import { useStyles } from './RemoveAuthenticatorFields.styles'

export interface OTPFieldsProps {
  isLoading: boolean
  email: string
}

export const RemoveAuthenticatorFields = ({
  isLoading,
  email
}: OTPFieldsProps) => {
  const classes = useStyles()
  const { control, watch } = useFormContext()
  const isOTPFull = watch('otp').length === 6
  const isEmailCodeFull = watch('emailCode').length === 6

  return (
    <Grid container direction='column' spacing={4}>
      <Grid item container direction='column'>
        <Grid item>
          <TypedField
            control={control}
            customRenderer
            component={TextField}
            name='emailCode'
            fullWidth
            placeholder={'E-mail verification code'}
            variant='outlined'
          />
        </Grid>
        <Grid item>
          <Typography variant={'body1'} className={classes.label}>
            Enter the 6-digit code sent to {renderPartOfEmail(email)}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container direction='column'>
        <Grid item>
          <TypedField
            control={control}
            customRenderer
            component={TextField}
            name='otp'
            fullWidth
            placeholder={'Authenticator Code'}
            variant='outlined'
          />
        </Grid>
        <Grid item>
          <Typography variant={'body1'} className={classes.label}>
            Enter the 6-digit code from your existing authenticator app
          </Typography>
        </Grid>
      </Grid>
      <Grid item container justifyContent='center' spacing={2}>
        <Grid item>
          <Submit
            size='large'
            variant='contained'
            color='primary'
            disabled={isLoading || !isOTPFull || !isEmailCodeFull}
          >
            Remove and continue
          </Submit>
        </Grid>
      </Grid>
    </Grid>
  )
}
