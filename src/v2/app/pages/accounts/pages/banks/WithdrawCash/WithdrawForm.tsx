import React from 'react'
import { WithdrawCashFormValues } from 'v2/app/pages/accounts/types'
import { withdrawCashFormValidationSchema } from 'v2/app/pages/accounts/validation'
import { useWithdrawCash } from 'v2/app/pages/accounts/pages/banks/hooks/useWithdrawCash'
import { createTypedForm } from 'v2/components/form/typed/createTypedForm'

export const useWithdrawCashForm = createTypedForm<WithdrawCashFormValues>()

export const WithdrawForm: React.FC = props => {
  const { children } = props
  const { Form } = useWithdrawCashForm()
  const [withdrawCash] = useWithdrawCash()
  const handleSubmit = (values: WithdrawCashFormValues): void => {
    // eslint-disable-next-line no-void
    void withdrawCash(values)
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
