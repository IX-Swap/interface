import React from 'react'
import { Form } from 'components/form/Form'
import { AuthorizerFormFields } from 'app/pages/authorizer/components/AuthorizerFormFields'
import { AuthorizableStatus } from 'types/util'
import { authorizationFormSchema } from 'validation/authorizationForm'

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
