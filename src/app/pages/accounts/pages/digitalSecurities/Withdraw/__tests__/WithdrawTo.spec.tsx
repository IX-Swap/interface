import React from 'react'
import { render, cleanup } from 'test-utils'
import { WithdrawTo } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/WithdrawTo'

jest.mock(
  'app/pages/accounts/pages/digitalSecurities/Withdraw/AddressType',
  () => ({
    AddressType: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/accounts/pages/digitalSecurities/Withdraw/Network',
  () => ({
    Network: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/accounts/pages/digitalSecurities/Withdraw/AddressField',
  () => ({
    AddressField: jest.fn(() => null)
  })
)

describe('WithdrawTo', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<WithdrawTo />)
  })
})
