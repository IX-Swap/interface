import React from 'react'
import { Form } from 'components/form/Form'
import { Remove2faFormValues } from 'app/pages/security/types'
import { RemoveAuthenticatorFields } from 'app/pages/security/pages/update2fa/components/RemoveAuthenticatorFields'

export const initialValues = {
  otp: '',
  emailCode: ''
}

export interface RemoveAuthenticatorFormProps {
  email: string
  isLoading: boolean
  onSubmit: (values: Remove2faFormValues) => void
}

export const RemoveAuthenticatorForm = ({
  email,
  isLoading,
  onSubmit
}: RemoveAuthenticatorFormProps) => {
  return (
    <Form
      data-testid='remove-authenticator-form'
      defaultValues={initialValues}
      onSubmit={onSubmit}
    >
      <RemoveAuthenticatorFields isLoading={isLoading} email={email} />
    </Form>
  )
}
