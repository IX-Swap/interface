import { ConvertedAssetBalance } from 'types/balance'
import { ExpandButton } from 'ui/CompactTable/ExpandButton'
import { CashStatus } from 'app/pages/accounts/pages/cash/components/CashStatus'
import { render } from 'test-utils'
import { renderActionButton } from 'app/pages/accounts/pages/cash/components/renderActionbutton'
import { cashBalanceSubmitted, cashBalance } from '__fixtures__/balance'
import React from 'react'
jest.mock('app/pages/accounts/pages/cash/components/CashStatus', () => ({
  CashStatus: jest.fn(() => null)
}))
jest.mock('ui/CompactTable/ExpandButton', () => ({
  ExpandButton: jest.fn(() => null)
}))
describe('renderActionButton', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })
  it('renders Cash status when item it is not approved', () => {
    render(<>{renderActionButton(cashBalanceSubmitted)}</>)
    expect(CashStatus).toBeCalledWith(
      expect.objectContaining({
        item: cashBalanceSubmitted
      }),
      {}
    )
    expect(ExpandButton).toBeCalledTimes(0)
  })
  it('Renders expand button when it is approved', () => {
    render(<>{renderActionButton(cashBalance)}</>)
    expect(ExpandButton).toBeCalledWith(
      expect.objectContaining({
        item: cashBalance
      }),
      {}
    )
    expect(CashStatus).toBeCalledTimes(0)
  })
})
