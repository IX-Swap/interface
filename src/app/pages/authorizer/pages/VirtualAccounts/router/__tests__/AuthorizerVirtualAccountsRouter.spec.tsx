import { AuthorizerVirtualAccountsRouter } from 'app/pages/authorizer/pages/VirtualAccounts/router/AuthorizerVirtualAccountsRouter'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('AuthorizerVirtualAccountsRouter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<AuthorizerVirtualAccountsRouter />)
  })
})
