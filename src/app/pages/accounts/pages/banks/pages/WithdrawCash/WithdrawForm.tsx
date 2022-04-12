import React from 'react'
import { WithdrawCashFormValues } from 'app/pages/accounts/types'
import { withdrawCashFormValidationSchema } from 'app/pages/accounts/validation'
import { useWithdrawCash } from 'app/pages/accounts/pages/banks/hooks/useWithdrawCash'
import { Form } from 'components/form/Form'
import { useVirtualAccount } from 'app/pages/accounts/hooks/useVirtualAccount'

export const WithdrawForm: React.FC = props => {
  const { children } = props
  const [withdrawCash] = useWithdrawCash()
  const handleSubmit = async (values: WithdrawCashFormValues) => {
    return await withdrawCash(values)
  }
  const { list, isLoading } = useVirtualAccount()

  if (list === undefined || list.length < 1 || isLoading) {
    return null
  }

  return (
    <Form
      onSubmit={handleSubmit}
      defaultValues={{
        virtualAccount: list[0].accountNumber,
        bankAccountId: null,
        amount: null,
        otp: null,
        paymentMethodName: null
      }}
      validationSchema={withdrawCashFormValidationSchema}
      shouldUnregister={false}
    >
      {children}
    </Form>
  )
}
