import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  AuthorizationDocuments,
  AuthorizationDocumentsProps
} from 'app/pages/authorizer/components/AuthorizationDocuments'
import { DataroomFeature } from 'types/authorizer'
import { Form } from 'components/form/Form'

describe('AuthorizationDocuments', () => {
  const props: AuthorizationDocumentsProps = {
    feature: DataroomFeature['bank-accounts'],
    resourceId: 'testResourceId'
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form defaultValues={{ documents: [] }}>
        <AuthorizationDocuments {...props} />
      </Form>
    )
  })
})
