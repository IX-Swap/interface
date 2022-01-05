import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { TypedField } from 'components/form/TypedField'
import { OTPField } from 'components/form/OTPField'
import { useFormContext } from 'react-hook-form'
import { Submit } from 'components/form/Submit'
import { plainValueExtractor } from 'helpers/forms'

export interface OTPFieldsProps {
  isLoading: boolean
}

export const OTPFields = ({ isLoading }: OTPFieldsProps) => {
  const { control } = useFormContext()

  return (
    <Grid container direction='column' spacing={4}>
      <Grid item>
        <Typography
          variant='h6'
          style={{ textTransform: 'capitalize' }}
          align='center'
        >
          Two-factor authentication
        </Typography>
      </Grid>
      <Grid item>
        <TypedField
          control={control}
          customRenderer
          component={OTPField}
          name='otp'
          label='Enter the 6-digit code from your authenticator app:'
          variant='standard'
          valueExtractor={plainValueExtractor}
          shouldAutoFocus
        />
      </Grid>
      <Grid item container justifyContent='center'>
        <Submit
          style={{ width: 150 }}
          size='large'
          variant='contained'
          color='primary'
          disabled={isLoading}
        >
          Continue
        </Submit>
      </Grid>
    </Grid>
  )
}
