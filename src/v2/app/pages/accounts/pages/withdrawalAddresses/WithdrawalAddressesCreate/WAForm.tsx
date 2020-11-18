import React, { PropsWithChildren } from 'react'
import { FormProps, Form } from 'v2/components/form/Form'
import { WithdrawalAddressFormValues } from 'v2/types/withdrawalAddress'
import { waFormValidationSchema } from '../validation'
import { useWithdrawalAddress } from '../hooks/useWithdrawalAddress'

export const WithdrawalAddressForm = (
  props: PropsWithChildren<FormProps<WithdrawalAddressFormValues>>
) => {
  const { children, ...rest } = props
  const [makeWithdrawalAddress] = useWithdrawalAddress()
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
