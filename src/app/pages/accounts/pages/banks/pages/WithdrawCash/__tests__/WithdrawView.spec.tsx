import React from 'react'
import {} from 'test-utils'
import { WithdrawView } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/WithdrawView'
import { render } from '@testing-library/react'

jest.mock('app/pages/accounts/pages/banks/pages/WithdrawCash/Setup', () => ({
  Setup: jest.fn(() => null)
}))

jest.mock(
  'app/pages/accounts/pages/banks/pages/WithdrawCash/RecentWithdrawals',
  () => ({
    Setup: jest.fn(() => null)
  })
)

describe('WithdrawView', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders withour errors', () => {
    render(<WithdrawView />)
  })
})
