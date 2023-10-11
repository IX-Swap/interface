import React, { ReactElement } from 'react'
import { Form } from 'components/form/Form'
import { WithdrawalAddressFormValues } from 'types/withdrawalAddress'
import { waFormValidationSchema } from 'app/pages/accounts/pages/withdrawalAddresses/validation'
import { useConnectMetamaskWallet } from '../hooks/useConnectMetamaskWallet'
import { WAConnect } from './WAConnect'

interface WithdrawalAddressFormProps {
  hint: ReactElement
}

export const WithdrawalAddressForm = ({ hint }: WithdrawalAddressFormProps) => {
  const { signWallet, status, getAccount } = useConnectMetamaskWallet()
  const handleSubmit = async ({
    agree,
    ...values
  }: WithdrawalAddressFormValues) => {
    await signWallet(values)
  }

  return (
    <Form
      onSubmit={handleSubmit}
      validationSchema={waFormValidationSchema}
      defaultValues={{ agree: false }}
      data-testid='blockchain-address-form'
    >
      <WAConnect hint={hint} status={status} getAccount={getAccount} />
    </Form>
  )
}
