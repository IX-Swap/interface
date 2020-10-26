import React from 'react'
import { DepositCashFormValues } from 'v2/app/pages/accounts/types'
import { depositCashFormValidationSchema } from 'v2/app/pages/accounts/validation'
import { useDepositCash } from 'v2/app/pages/accounts/pages/banks/hooks/useDepositCash'
import { Form } from 'v2/components/form/Form'

export interface DepositFormProps {
  depositCode: string
}

export const DepositForm: React.FC<DepositFormProps> = props => {
  const { depositCode, children } = props
  const [depositCash] = useDepositCash()
  const handleSubmit = async (values: DepositCashFormValues) => {
    await depositCash({ ...values, depositCode })
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
