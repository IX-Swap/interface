import React from 'react'
import { WithdrawCashFormValues } from 'v2/app/accounts/types'
import { withdrawCashFormValidationSchema } from 'v2/app/accounts/validation'
import { useWithdrawCash } from 'v2/app/accounts/banks/hooks/useWithdrawCash'
import { Form } from 'v2/components/form/Form'

export const WithdrawForm: React.FC = props => {
  const { children } = props
  const { mutate: withdrawCash } = useWithdrawCash()
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
