import React, { PropsWithChildren } from 'react'
import { FormProps, Form } from 'v2/components/form/Form'
import { WithdrawalAddressFormValues } from 'v2/types/withdrawalAddress'
import { waFormValidationSchema } from 'v2/app/pages/accounts/pages/withdrawalAddresses/validation'
import { useMakeWithdrawalAddress } from 'v2/app/pages/accounts/pages/withdrawalAddresses/hooks/useMakeWithdrawalAddress'

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
    >
      {children}
    </Form>
  )
}
