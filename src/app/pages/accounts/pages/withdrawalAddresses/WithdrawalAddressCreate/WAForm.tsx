import React, { PropsWithChildren } from 'react'
import { FormProps, Form } from 'components/form/Form'
import { WithdrawalAddressFormValues } from 'types/withdrawalAddress'
import { waFormValidationSchema } from 'app/pages/accounts/pages/withdrawalAddresses/validation'
import { useMakeWithdrawalAddress } from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useMakeWithdrawalAddress'

export const WithdrawalAddressForm = (
  props: PropsWithChildren<FormProps<WithdrawalAddressFormValues>>
) => {
  const { children, ...rest } = props
  const [makeWithdrawalAddress] = useMakeWithdrawalAddress()
  const handleSubmit = async ({
    agree,
    ...values
  }: WithdrawalAddressFormValues) => {
    await makeWithdrawalAddress(values)
  }

  return (
    <Form
      {...rest}
      onSubmit={handleSubmit}
      validationSchema={waFormValidationSchema}
      defaultValues={{ variant: 'create' }}
      data-testid='blockchain-address-form'
    >
      {children}
    </Form>
  )
}
