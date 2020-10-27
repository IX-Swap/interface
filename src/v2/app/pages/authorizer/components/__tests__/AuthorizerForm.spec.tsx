/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  AuthorizerForm,
  AuthorizerFormProps
} from 'v2/app/pages/authorizer/components/AuthorizerForm'
import { AuthorizerFormFields } from 'v2/app/pages/authorizer/components/AuthorizerFormFields'

jest.mock('v2/app/pages/authorizer/components/AuthorizerFormFields', () => ({
  AuthorizerFormFields: jest.fn(() => null)
}))

describe('AuthorizerForm', () => {
  const props: AuthorizerFormProps = {
    status: 'Approved',
    itemId: 'test-itemId',
    defaultValues: { comment: 'test comment', sharedWithUser: false }
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<AuthorizerForm {...props} />)
  })

  it('renders AuthorizerFormFields  with correct props', () => {
    render(<AuthorizerForm {...props} />)

    expect(AuthorizerFormFields).toHaveBeenCalledWith(
      {
        itemId: props.itemId,
        status: props.status
      },
      {}
    )
  })
})
