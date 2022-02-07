import { Grid, Typography, Box } from '@mui/material'
import { useVerifyCaptcha } from 'auth/hooks/useVerifyCaptcha'
import { RECAPTCHA_KEY } from 'config'
import React, { useRef } from 'react'
import Reaptcha from 'reaptcha'

export interface RecaptchaProps {
  onVerify: () => void
}

export const Recaptcha = ({ onVerify }: RecaptchaProps) => {
  const captchRef = useRef<Reaptcha>(null)

  const handleError = () => {
    void captchRef.current?.reset()
  }

  const [verifyToken] = useVerifyCaptcha(handleError, onVerify)

  const handleVerify = async (response: string) => {
    await verifyToken(response)
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
          <Reaptcha
            ref={captchRef}
            sitekey={RECAPTCHA_KEY ?? ''}
            onVerify={handleVerify}
            onExpire={handleError}
          />
        </Box>
      </Grid>
    </Grid>
  )
}
