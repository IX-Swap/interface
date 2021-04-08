import React from 'react'
import { DepositCashFormValues } from 'app/pages/accounts/types'
import { depositCashFormValidationSchema } from 'app/pages/accounts/validation'
import { useDepositCash } from 'app/pages/accounts/pages/banks/hooks/useDepositCash'
import { Form } from 'components/form/Form'

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
