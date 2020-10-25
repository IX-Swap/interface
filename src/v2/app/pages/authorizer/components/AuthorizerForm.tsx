import React from 'react'
import { Form } from 'v2/components/form/Form'
import { AuthorizerFormFields } from 'v2/app/pages/authorizer/components/AuthorizerFormFields'

export interface AuthorizerFormValues {
  comment: string
  sharedWithUser: boolean
}

export interface AuthorizerFormProps {
  itemId: string
  defaultValues: AuthorizerFormValues
}

export const AuthorizerForm = (props: AuthorizerFormProps) => {
  const { itemId, defaultValues } = props

  return (
    <Form defaultValues={defaultValues}>
      <AuthorizerFormFields itemId={itemId} />
    </Form>
  )
}
