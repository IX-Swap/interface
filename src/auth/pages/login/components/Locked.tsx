import { Button, Grid, Link, Typography } from '@mui/material'
import { useRequestPasswordReset } from 'auth/hooks/useRequestPasswordReset'
import React, { useState, useEffect } from 'react'

export interface LockedProps {
  email: string
}

export const Locked = ({ email }: LockedProps) => {
  const timerStartValue = 30
  const [timer, setTimer] = useState(timerStartValue)

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1)
      } else {
        clearInterval(timerInterval)
      }
    }, 1000)
    return () => {
      clearInterval(timerInterval)
    }
  }, [timer])

  const [reset, { isLoading }] = useRequestPasswordReset()

  const handleReset = async () => {
    await reset({ email: email })
    setTimer(timerStartValue)
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant='body1' color='error' align='center'>
          Your account has been locked due to multiple failed attempts. We have
          sent a reset link to your registered email address.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant='contained'
          color='primary'
          disableElevation
          style={{ width: '100%', marginBottom: 10 }}
          disabled={timer > 0 || isLoading}
          onClick={handleReset}
        >
          Resend Link
        </Button>
        {timer > 0 && (
          <Typography variant='body1' align='center'>
            Resend link again in 00:{timer}s
          </Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <Typography variant='body1' align='center' style={{ marginTop: 120 }}>
          Did not receive link? Reach out to{' '}
          <Link href='https://investax.io/contact/'>Support</Link>
        </Typography>
      </Grid>
    </Grid>
  )
}
