import React from 'react'
import { render, cleanup } from 'test-utils'
import { WithdrawalAmount } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/WithdrawalAmount'

jest.mock(
  'app/pages/accounts/pages/digitalSecurities/Withdraw/AmountField',
  () => ({
    AmountField: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/accounts/pages/digitalSecurities/Withdraw/MemoField',
  () => ({
    MemoField: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/accounts/pages/digitalSecurities/Withdraw/Warning',
  () => ({
    Warning: jest.fn(() => null)
  })
)

describe('WithdrawalAmount', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<WithdrawalAmount />)
  })
})
