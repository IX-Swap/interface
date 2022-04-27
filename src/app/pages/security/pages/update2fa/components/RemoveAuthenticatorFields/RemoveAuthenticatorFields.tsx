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
import { useGetEmailCode } from 'app/pages/security/pages/update2fa/hooks/useGetEmailCode'
import { ResendCode } from 'app/pages/security/pages/update2fa/components/ResendCode/ResendCode'

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
  const otpValueLength = 6
  const isOTPFull = watch('otp').length === otpValueLength
  const isEmailCodeFull = watch('emailCode').length === otpValueLength
  const { refetch, data } = useGetEmailCode()
  const getEmailCode = async () => {
    await refetch()
  }

  return (
    <Grid container direction='column'>
      <Grid item container direction='column'>
        <Grid item>
          <TypedField
            control={control}
            customRenderer
            component={TextInput}
            label={
              <Typography variant={'body1'} style={{ color: '#0A1326' }}>
                Verification Code
              </Typography>
            }
            name='emailCode'
            fullWidth
            placeholder={'E-mail verification code'}
            variant='outlined'
            InputProps={{
              endAdornment: <ResendCode action={getEmailCode} data={data} />
            }}
          />
        </Grid>
        <Grid item>
          <Typography variant={'body1'} className={classes.helperText}>
            Enter the 6-digit code sent to {renderPartOfEmail(email)}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container direction='column'>
        <Grid item className={classes.label}>
          <Typography variant={'body1'}>Authenticator Code</Typography>
        </Grid>
        <Grid item>
          <TypedField
            control={control}
            component={OTPInputField}
            name='otp'
            fullwidth
            valueExtractor={plainValueExtractor}
            isInputNum
            numInputs={otpValueLength}
            variant='outlined'
          />
        </Grid>
        <Grid item>
          <Typography variant={'body1'} className={classes.helperText}>
            Enter the 6-digit code from your existing Authenticator App
          </Typography>
        </Grid>
        <Grid item>
          <Submit
            size='large'
            variant='contained'
            color='primary'
            className={classes.button}
            disabled={isLoading || !isOTPFull || !isEmailCodeFull}
          >
            Remove and continue
          </Submit>
        </Grid>
      </Grid>
    </Grid>
  )
}
