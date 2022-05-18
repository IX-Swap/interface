import React from 'react'
import { Form } from 'components/form/Form'
import { Remove2faFormValues } from 'app/pages/security/types'
import { RemoveAuthenticatorFields } from 'app/pages/security/pages/update2fa/components/RemoveAuthenticatorFields/RemoveAuthenticatorFields'

export const initialValues = {
  otp: '',
  emailCode: ''
}

export interface RemoveAuthenticatorFormProps {
  isRemove2FALoading: boolean
  onSubmit: (values: Remove2faFormValues) => void
}

export const RemoveAuthenticatorForm = ({
  isRemove2FALoading,
  onSubmit
}: RemoveAuthenticatorFormProps) => {
  return (
    <Form
      data-testid='remove-authenticator-form'
      defaultValues={initialValues}
      onSubmit={onSubmit}
    >
      <RemoveAuthenticatorFields isRemove2FALoading={isRemove2FALoading} />
    </Form>
  )
}
