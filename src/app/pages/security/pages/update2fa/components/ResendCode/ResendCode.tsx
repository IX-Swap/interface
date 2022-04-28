import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import { useStyles } from 'app/pages/security/pages/update2fa/components/ResendCode/ResendCode.styles'
import classNames from 'classnames'
import { useGetEmailCode } from 'app/pages/security/pages/update2fa/hooks/useGetEmailCode'

export const ResendCode = () => {
  const classes = useStyles()
  const [isDisabled, setIsDisabled] = useState(false)
  const [getCodeCount, setGetCodeCount] = useState(0)
  const { refetch, isLoading } = useGetEmailCode()

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

  const getText = () => {
    if (getCodeCount === 0) {
      return 'Send'
    }
    if (isDisabled) {
      return 'Resend in 30 sec'
    }

    return 'Resend Code'
  }

  const handleClick = async () => {
    if (!isDisabled && !isLoading) {
      await refetch()
      setIsDisabled(true)
      setGetCodeCount(getCodeCount + 1)
    }
  }

  return (
    <Typography
      variant={'body1'}
      className={classNames(classes.wrapper, {
        [classes.disabled]: isDisabled || isLoading
      })}
      onClick={handleClick}
    >
      {getText()}
    </Typography>
  )
}
