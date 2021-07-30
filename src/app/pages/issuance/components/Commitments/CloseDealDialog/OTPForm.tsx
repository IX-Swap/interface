import React from 'react'
// import { loginFormValidationSchema } from 'validation/auth'
import { Form } from 'components/form/Form'
import { OTPFields } from 'app/pages/issuance/components/Commitments/CloseDealDialog/OTPFields'

// TODO Do refactoring after complete backend api endpoints
export const initialValues = {
  otp: ''
}

export interface OTPFormProps {
  onClose: () => void
  onSubmit: (values: any) => void
}

export const OTPForm = ({ onClose, onSubmit }: OTPFormProps) => {
  return (
    <Form
      data-testid='otp-form'
      defaultValues={initialValues}
      // TODO Do refactoring after complete backend api endpoints
      // validationSchema={loginFormValidationSchema}
      onSubmit={onSubmit}
    >
      <OTPFields isLoading={false} onClose={onClose} />
    </Form>
  )
}
