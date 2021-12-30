import { VirtualAccounts } from 'app/pages/authorizer/pages/VirtualAccounts/VirtualAccounts'
import React from 'react'
import { render } from 'test-utils'
import { AuthorizerList } from 'app/pages/authorizer/components/AuthorizerList'
import { virtualAccounts } from 'config/apiURL'
import { authorizerQueryKeys } from 'config/queryKeys'

jest.mock('app/pages/authorizer/components/AuthorizerList', () => ({
  AuthorizerList: jest.fn(() => null)
}))

describe('VirtualAccounts', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<VirtualAccounts />)
  })

  it.skip('renders with correct props', () => {
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
