import React from 'react'
import { render, cleanup } from 'test-utils'
import { Withdraw } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/Withdraw'

jest.mock(
  'app/pages/accounts/pages/digitalSecurities/Withdraw/WithdrawForm',
  () => ({
    WithdrawForm: jest.fn(() => null)
  })
)

describe('Withdraw', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Withdraw />)
  })
})
