import React from 'react'
import { render } from 'test-utils'
import {
  AuthorizerForm,
  AuthorizerFormProps
} from 'app/pages/authorizer/components/AuthorizerForm'
import { AuthorizerFormFields } from 'app/pages/authorizer/components/AuthorizerFormFields'

jest.mock('app/pages/authorizer/components/AuthorizerFormFields', () => ({
  AuthorizerFormFields: jest.fn(() => null)
}))

describe('AuthorizerForm', () => {
  const props: AuthorizerFormProps = {
    status: 'Approved',
    itemId: 'test-itemId'
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
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
