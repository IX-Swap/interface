import { VirtualAccounts } from 'app/pages/authorizer/pages/VirtualAccounts/VirtualAccounts'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { AuthorizerList } from 'app/pages/authorizer/components/AuthorizerList'
import { virtualAccounts } from 'config/apiURL'
import { authorizerQueryKeys } from 'config/queryKeys'

jest.mock('app/pages/authorizer/components/AuthorizerList', () => ({
  AuthorizerList: jest.fn(() => null)
}))

describe('VirtualAccounts', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<VirtualAccounts />)
  })

  it('renders with correct props', () => {
    render(<VirtualAccounts />)
    expect(AuthorizerList).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Authorize Virtual Account(s)',
        uri: virtualAccounts.getAll,
        name: authorizerQueryKeys.getVirtualAccounts
      }),
      {}
    )
  })
})
