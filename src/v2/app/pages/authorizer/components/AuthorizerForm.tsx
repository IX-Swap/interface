import React from 'react'
import { Form } from 'v2/components/form/Form'
import { AuthorizerFormFields } from 'v2/app/pages/authorizer/components/AuthorizerFormFields'
import { AuthorizableStatus } from 'v2/types/util'
import { authorizationFormSchema } from 'v2/validation/authorizationForm'

export interface AuthorizerFormValues {
  comment?: string
  sharedWithUser?: boolean
}

export interface AuthorizerFormProps {
  status: AuthorizableStatus
  itemId: string
}

export const AuthorizerForm = (props: AuthorizerFormProps) => {
  const { itemId, status } = props

  return (
    <Form validationSchema={authorizationFormSchema}>
      <AuthorizerFormFields itemId={itemId} status={status} />
    </Form>
  )
}
