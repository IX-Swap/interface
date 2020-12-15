import React from 'react'
import { WithdrawCashFormValues } from 'app/pages/accounts/types'
import { withdrawCashFormValidationSchema } from 'app/pages/accounts/validation'
import { useWithdrawCash } from 'app/pages/accounts/pages/banks/hooks/useWithdrawCash'
import { Form } from 'components/form/Form'

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
