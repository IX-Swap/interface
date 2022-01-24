import { Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useTokenInfo } from 'app/pages/accounts/hooks/useTokenInfo'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export const Warning = () => {
  const { watch } = useFormContext()
  const tokenSymbol = watch('token')
  const { data, isLoading } = useTokenInfo(tokenSymbol)

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <Alert severity='warning'>
      <Typography variant='body1' color='error'>
        Please double check the address and network before proceeding. We maybe
        unable to recover the {data.network.nativeCurrency.symbol ?? ''} tokens
        sent to a wrong network or address.
      </Typography>
    </Alert>
  )
}
