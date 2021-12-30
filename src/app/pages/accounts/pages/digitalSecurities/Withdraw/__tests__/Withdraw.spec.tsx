import React from 'react'
import { render } from 'test-utils'
import { Withdraw } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/Withdraw'

jest.mock(
  'app/pages/accounts/pages/digitalSecurities/Withdraw/WithdrawForm',
  () => ({
    WithdrawForm: jest.fn(() => null)
  })
)

describe('Withdraw', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<Withdraw />)
  })
})
