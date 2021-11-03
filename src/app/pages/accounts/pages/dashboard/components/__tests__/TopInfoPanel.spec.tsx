import React from 'react'
import { render, cleanup } from 'test-utils'
import { TopInfoPanel } from 'app/pages/accounts/pages/dashboard/components/TopInfoPanel/TopInfoPanel'
import {
  fakeBalancesInfo,
  fakeVirtualAccountInfo
} from '__fixtures__/portfolio'
import { AvailableCash } from 'app/pages/accounts/pages/dashboard/components/AvailableCash/AvailableCash'
import { Investments } from 'app/pages/accounts/pages/dashboard/components/Investments/Investments'
import { TotalAssetBalance } from 'app/pages/accounts/pages/dashboard/components/TotalAssetBalance/TotalAssetBalance'
import { BlockchainWallets } from 'app/pages/accounts/pages/dashboard/components/BlockchainWallets/BlockchainWallets'

jest.mock(
  'app/pages/accounts/pages/dashboard/components/AvailableCash/AvailableCash',
  () => ({
    AvailableCash: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/accounts/pages/dashboard/components/Investments/Investments',
  () => ({
    Investments: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/accounts/pages/dashboard/components/TotalAssetBalance/TotalAssetBalance',
  () => ({
    TotalAssetBalance: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/accounts/pages/dashboard/components/BlockchainWallets/BlockchainWallets',
  () => ({
    BlockchainWallets: jest.fn(() => null)
  })
)

describe('TopInfoPanel', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <TopInfoPanel
        accounts={[fakeVirtualAccountInfo]}
        balances={fakeBalancesInfo}
      />
    )
  })

  it('renders empty container when accounts is undefined', () => {
    const { container } = render(
      <TopInfoPanel accounts={undefined} balances={fakeBalancesInfo} />
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('renders empty container when balances is undefined', () => {
    const { container } = render(
      <TopInfoPanel accounts={undefined} balances={fakeBalancesInfo} />
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('renders empty container when accounts and balances is undefined', () => {
    const { container } = render(
      <TopInfoPanel accounts={undefined} balances={fakeBalancesInfo} />
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('renders children with correct props', () => {
    render(
      <TopInfoPanel
        accounts={[fakeVirtualAccountInfo]}
        balances={fakeBalancesInfo}
      />
    )

    expect(AvailableCash).toHaveBeenCalledWith(
      { accounts: [fakeVirtualAccountInfo] },
      {}
    )
    expect(Investments).toHaveBeenCalledWith(
      { primary: fakeBalancesInfo.primaryInvestmentBalance },
      {}
    )
    expect(TotalAssetBalance).toHaveBeenCalledWith(
      { value: fakeBalancesInfo.totalAssetBalance },
      {}
    )
    expect(BlockchainWallets).toHaveBeenCalledWith(
      { count: fakeBalancesInfo.withdrawalAddressCount },
      {}
    )
  })
})
