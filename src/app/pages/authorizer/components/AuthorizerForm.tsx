import React from 'react'
import { Form } from 'components/form/Form'
import { AuthorizerFormFields } from 'app/pages/authorizer/components/AuthorizerFormFields'
import { AuthorizableStatus } from 'types/util'
import { authorizationFormSchema } from 'validation/authorizationForm'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'

export interface AuthorizerFormValues {
  comment?: string
  sharedWithUser?: boolean
}

export interface AuthorizerFormProps {
  status: AuthorizableStatus
  itemId: string
  listingType: any
}

export const AuthorizerForm = (props: AuthorizerFormProps) => {
  const { itemId, status, listingType } = props
  return (
    <FieldContainer>
      <Form validationSchema={authorizationFormSchema}>
        <AuthorizerFormFields
          itemId={itemId}
          status={status}
          listingType={listingType}
        />
      </Form>
    </FieldContainer>
  )
}
