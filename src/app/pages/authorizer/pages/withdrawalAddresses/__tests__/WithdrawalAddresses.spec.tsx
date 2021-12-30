import React from 'react'
import { render } from 'test-utils'
import { WithdrawalAddresses } from 'app/pages/authorizer/pages/withdrawalAddresses/WithdrawalAddresses'

jest.mock('app/pages/authorizer/components/AuthorizerList', () => ({
  AuthorizerList: jest.fn(() => null)
}))

describe('WithdrawalAddresses', () => {
  afterEach(async () => {})

  it.skip('renders without error', async () => {
    render(<WithdrawalAddresses />)
  })
})
