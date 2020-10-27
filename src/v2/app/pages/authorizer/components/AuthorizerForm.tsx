import React from 'react'
import { Form } from 'v2/components/form/Form'
import { AuthorizerFormFields } from 'v2/app/pages/authorizer/components/AuthorizerFormFields'
import { AuthorizableStatus } from 'v2/types/util'

export interface AuthorizerFormValues {
  comment: string
  sharedWithUser: boolean
}

export interface AuthorizerFormProps {
  status: AuthorizableStatus
  itemId: string
  defaultValues: AuthorizerFormValues
}

export const AuthorizerForm = (props: AuthorizerFormProps) => {
  const { itemId, defaultValues, status } = props

  return (
    <Form defaultValues={defaultValues}>
      <AuthorizerFormFields itemId={itemId} status={status} />
    </Form>
  )
}
