import { Grid, Typography, Box } from '@material-ui/core'
import { RECAPTCHA_KEY } from 'config'
import React from 'react'
import Reaptcha from 'reaptcha'

export interface RecaptchaProps {
  onVerify: () => void
}

export const Recaptcha = ({ onVerify }: RecaptchaProps) => {
  const handleVerify = (response: string) => {
    setTimeout(() => {
      onVerify()
    }, 1000)
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant='body1' color='error' align='center'>
          We notice multiple failed attempts. Please verify you are not a robot.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box width='100%' display='flex' justifyContent='center'>
          <Reaptcha sitekey={RECAPTCHA_KEY ?? ''} onVerify={handleVerify} />
        </Box>
      </Grid>
    </Grid>
  )
}
