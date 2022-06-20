import { EmptyState } from 'app/pages/invest/components/Trading/Orders/EmptyState'
import * as useMetamaskConnectionManager from 'app/pages/invest/hooks/useMetamaskConnectionManager'
import { AccountState } from 'app/pages/invest/hooks/useMetamaskWalletState'
import React from 'react'
import { render } from 'test-utils'
import { OpenOrdersEmptyState } from '../OpenOrdersEmptyState'

jest.mock('app/pages/invest/components/Trading/Orders/EmptyState', () => ({
  EmptyState: jest.fn(() => null)
}))

describe('OpenOrdersEmptyState', () => {
  const mockMetamaskDetails = {
    switchChain: jest.fn(),
    accountState: AccountState.SAME_CHAIN,
    targetChainName: 'test chain',
    isWhitelisted: { found: true }
  }
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders empty state correctly for account state', () => {
    jest
      .spyOn(useMetamaskConnectionManager, 'useMetamaskConnectionManager')
      .mockImplementation(() => mockMetamaskDetails as any)

    render(<OpenOrdersEmptyState />)
    expect(EmptyState).toBeCalledWith(
      expect.objectContaining({
        title: 'No orders',
        subtitle:
          'No orders on this wallet, make sure you are connected to the right address'
      }),
      {}
    )
  })
})
