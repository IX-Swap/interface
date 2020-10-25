import React from 'react'
import { WithdrawCashFormValues } from 'v2/app/pages/accounts/types'
import { withdrawCashFormValidationSchema } from 'v2/app/pages/accounts/validation'
import { useWithdrawCash } from 'v2/app/pages/accounts/pages/banks/hooks/useWithdrawCash'
import { Form } from 'v2/components/form/Form'

export const WithdrawForm: React.FC = props => {
  const { children } = props
  const [withdrawCash] = useWithdrawCash()
  const handleSubmit = async (values: WithdrawCashFormValues) => {
    await withdrawCash(values)
  }

  return (
    <Form
      onSubmit={handleSubmit}
      validationSchema={withdrawCashFormValidationSchema}
    >
      {children}
    </Form>
  )
}
