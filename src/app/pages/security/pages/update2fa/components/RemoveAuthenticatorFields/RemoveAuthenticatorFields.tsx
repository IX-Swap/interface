import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Grid, Typography } from '@mui/material'
import { Submit } from 'components/form/Submit'
import { TypedField } from 'components/form/TypedField'
import { renderPartOfEmail } from 'helpers/rendering'
import { plainValueExtractor } from 'helpers/forms'
import { TextInput } from 'ui/TextInput/TextInput'
import { OTPInputField } from 'ui/OTPInputField/OTPInputField'
import { useStyles } from './RemoveAuthenticatorFields.styles'
import { ResendCode } from 'app/pages/security/pages/update2fa/components/ResendCode/ResendCode'
import { useAuth } from 'hooks/auth/useAuth'

export interface OTPFieldsProps {
  isRemove2FALoading: boolean
}

export const RemoveAuthenticatorFields = ({
  isRemove2FALoading
}: OTPFieldsProps) => {
  const otpValueLength = 6
  const { user } = useAuth()
  const classes = useStyles()
  const { control, watch } = useFormContext()
  const isOTPFull = watch('otp').length === otpValueLength
  const isEmailCodeFull = watch('emailCode').length === otpValueLength

  return (
    <Grid container direction='column'>
      <Grid item container direction='column'>
        <Grid item>
          <TypedField
            fullWidth
            customRenderer
            name='emailCode'
            control={control}
            variant='outlined'
            component={TextInput}
            label='Verification Code'
            InputProps={{
              endAdornment: <ResendCode />
            }}
            placeholder='E-mail verification code'
          />
        </Grid>
        <Grid item>
          <Typography variant={'body1'} className={classes.helperText}>
            Enter the 6-digit code sent to {renderPartOfEmail(user?.email)}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container direction='column'>
        <Grid item className={classes.label}>
          <Typography variant={'body1'}>Authenticator Code</Typography>
        </Grid>
        <Grid item container justifyContent={'flex-start'}>
          <Grid item>
            <TypedField
              fullwidth
              name='otp'
              isInputNum
              control={control}
              variant='outlined'
              component={OTPInputField}
              numInputs={otpValueLength}
              valueExtractor={plainValueExtractor}
            />
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant={'body1'} className={classes.helperText}>
            Enter the 6-digit code from your existing Authenticator App
          </Typography>
        </Grid>
        <Grid item>
          <Submit
            size='large'
            color='primary'
            variant='contained'
            className={classes.button}
            disabled={isRemove2FALoading || !isOTPFull || !isEmailCodeFull}
          >
            Remove and Continue
          </Submit>
        </Grid>
      </Grid>
    </Grid>
  )
}
