import { Box } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { useFormContext } from 'react-hook-form'
import { WithdrawalAddressFormValues } from 'types/withdrawalAddress'
import { WAConnect } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WAConnect'
import { WACreate } from 'app/pages/accounts/pages/withdrawalAddresses/WithdrawalAddressCreate/WACreate'

export interface WAFormContentProps {
  hint: ReactElement
}

export const WAFormContent = ({ hint }: WAFormContentProps) => {
  const { watch } = useFormContext<WithdrawalAddressFormValues>()
  const variant = watch('variant')
  const isCreate = variant === 'create'
  const isConnect = variant === 'connect'

  if (isConnect) {
    return <WAConnect hint={hint} />
  }

  if (isCreate) {
    return <WACreate hint={hint} />
  }

  return (
    <>
      {hint}
      <Box height={16} />
    </>
  )
}
