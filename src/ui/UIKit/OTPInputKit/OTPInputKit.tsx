import React, { useState } from 'react'
import { Grid, Typography } from '@mui/material'
import { UIKitThemeWrapper } from 'ui/UIKit/UIKitThemeWrapper'
import { OTPInputField } from 'ui/OTPInputField/OTPInputField'

export const OTPInputKit = () => {
  const [otp, setOtp] = useState<string>()
  const [otpError, setOtpError] = useState<string>()
  const [otpMobile, setOtpMobile] = useState<string>()

  return (
    <UIKitThemeWrapper>
      <Grid container spacing={4} alignContent='center'>
        <Grid item xs={12}>
          <Typography variant='h2'>2FA Input</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>Default</Typography>
        </Grid>

        <Grid item xs={12}>
          <OTPInputField
            name={'test'}
            value={otp}
            onChange={(value: string) => {
              setOtp(value)
            }}
            numInputs={6}
            isInputNum={true}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography>Error</Typography>
        </Grid>

        <Grid item xs={12}>
          <OTPInputField
            name={'test'}
            hasErrored={true}
            value={otpError}
            onChange={(value: string) => setOtpError(value)}
            numInputs={6}
            isInputNum={true}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography>Mobile</Typography>
        </Grid>

        <Grid item xs={12}>
          <OTPInputField
            name={'test'}
            value={otpMobile}
            onChange={(value: string) => setOtpMobile(value)}
            numInputs={6}
            isInputNum={true}
            mobile
          />
        </Grid>
      </Grid>
    </UIKitThemeWrapper>
  )
}
