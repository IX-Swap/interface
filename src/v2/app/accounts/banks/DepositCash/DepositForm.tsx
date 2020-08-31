import React from 'react'
import { DepositCashFormValues } from 'v2/app/accounts/types'
import { depositCashFormValidationSchema } from 'v2/app/accounts/validation'
import { useDepositCash } from 'v2/app/accounts/banks/hooks/useDepositCash'
import { Form } from 'v2/components/form/Form'

export interface DepositFormProps {
  depositCode: string
}

export const DepositForm: React.FC<DepositFormProps> = props => {
  const { depositCode, children } = props
  const { mutate: depositCash } = useDepositCash()
  const handleSubmit = (values: DepositCashFormValues): void => {
    // eslint-disable-next-line no-void
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
