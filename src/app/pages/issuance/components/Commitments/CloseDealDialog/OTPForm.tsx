import React from 'react'
import { Form } from 'components/form/Form'
import { OTPFields } from 'app/pages/issuance/components/Commitments/CloseDealDialog/OTPFields'
import { CloseDealArgs } from 'types/dso'

export const initialValues = {
  otp: ''
}

export interface OTPFormProps {
  isLoading: boolean
  onClose: () => void
  onSubmit: (values: CloseDealArgs) => void
  placeholder?: string
}

export const OTPForm = ({
  isLoading,
  onClose,
  onSubmit,
  placeholder
}: OTPFormProps) => {
  return (
    <Form
      data-testid='otp-form'
      defaultValues={initialValues}
      onSubmit={onSubmit}
    >
      <OTPFields
        placeholder={placeholder}
        isLoading={isLoading}
        onClose={onClose}
      />
    </Form>
  )
}
