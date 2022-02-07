import React, { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { ReactComponent as InfoIcon } from 'assets/icons/info.svg'
import { useStyles } from 'app/pages/security/pages/update2fa/components/ResendCode/ResendCode.styles'
import { GetEmailCodeResponse } from 'app/pages/security/types'

export interface ResendCodeProps {
  data: GetEmailCodeResponse | undefined
  action: () => void
}

export const ResendCode = ({ action, data }: ResendCodeProps) => {
  const classes = useStyles()
  const [isDisabled, setIsDisabled] = useState<boolean>(true)

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined
    if (isDisabled) {
      timeout = setTimeout(() => setIsDisabled(false), 30000)
    }
    return () => {
      if (timeout !== undefined) {
        clearTimeout(timeout)
      }
    }
  }, [isDisabled])

  const handleClick = async () => {
    await action()
    if (data !== undefined) {
      setIsDisabled(true)
    }
  }

  return (
    <Box className={classes.container}>
      <Box className={classes.wrapper}>
        <InfoIcon />
        <Typography variant={'body1'} className={classes.text}>
          Verification code has been sent.
        </Typography>
      </Box>
      <Button
        variant={'text'}
        color={'primary'}
        disabled={isDisabled}
        onClick={handleClick}
      >
        Resend Code
      </Button>
    </Box>
  )
}
