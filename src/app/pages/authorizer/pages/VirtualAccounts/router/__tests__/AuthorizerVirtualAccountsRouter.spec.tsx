import { AuthorizerVirtualAccountsRouter } from 'app/pages/authorizer/pages/VirtualAccounts/router/AuthorizerVirtualAccountsRouter'
import React from 'react'
import { render } from 'test-utils'

describe('AuthorizerVirtualAccountsRouter', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<AuthorizerVirtualAccountsRouter />)
  })
})
