import { Box } from '@material-ui/core'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { WithdrawalAddressFormValues } from 'types/withdrawalAddress'
import { WAConnect } from './WAConnect'
import { WACreate } from './WACreate'

export const WAFormContent = () => {
  const { watch } = useFormContext<WithdrawalAddressFormValues>()
  const variant = watch('variant')
  const isCreate = variant === 'create'
  const isConnect = variant === 'connect'

  if (isConnect) {
    return <WAConnect />
  }

  if (isCreate) {
    return <WACreate />
  }

  return <Box height={16} />
}
