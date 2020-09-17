import React from 'react'
import { DepositCashFormValues } from 'v2/app/pages/accounts/types'
import { depositCashFormValidationSchema } from 'v2/app/pages/accounts/validation'
import { useDepositCash } from 'v2/app/pages/accounts/pages/banks/hooks/useDepositCash'
import { createTypedForm } from 'v2/components/form/createTypedForm'

export const useDepositCashForm = createTypedForm<DepositCashFormValues>()

export interface DepositFormProps {
  depositCode: string
}

export const DepositForm: React.FC<DepositFormProps> = props => {
  const { depositCode, children } = props
  const { Form } = useDepositCashForm()
  const [depositCash] = useDepositCash()
  const handleSubmit = (values: DepositCashFormValues) => {
    void depositCash({ ...values, depositCode })
  }

  return (
    <Form
      onSubmit={handleSubmit}
      validationSchema={depositCashFormValidationSchema}
    >
      {children}
    </Form>
  )
}
