import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import { useStyles } from 'app/pages/security/pages/update2fa/components/ResendCode/ResendCode.styles'
import { GetEmailCodeResponse } from 'app/pages/security/types'
import classNames from 'classnames'

export interface ResendCodeProps {
  data: GetEmailCodeResponse | undefined
  action: () => void
}

export const ResendCode = ({ action, data }: ResendCodeProps) => {
  const classes = useStyles()
  const [isDisabled, setIsDisabled] = useState(true)

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
    if (!isDisabled) {
      await action()
      if (data !== undefined) {
        setIsDisabled(true)
      }
    }
  }

  return (
    <Typography
      variant={'body1'}
      className={classNames(classes.wrapper, {
        [classes.disabled]: isDisabled
      })}
      onClick={handleClick}
    >
      {isDisabled ? 'Resend in 30 sec' : 'Resend Code'}
    </Typography>
  )
}
