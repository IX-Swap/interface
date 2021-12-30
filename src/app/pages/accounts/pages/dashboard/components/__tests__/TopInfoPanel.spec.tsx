import React from 'react'
import { render } from 'test-utils'
import { TopInfoPanel } from 'app/pages/accounts/pages/dashboard/components/TopInfoPanel/TopInfoPanel'
import {
  fakeBalancesInfo,
  fakeVirtualAccountInfo
} from '__fixtures__/portfolio'
import {
  AvailableCash,
  noAccountsInfo
} from 'app/pages/accounts/pages/dashboard/components/AvailableCash/AvailableCash'
import { Investments } from 'app/pages/accounts/pages/dashboard/components/Investments/Investments'
import { TotalAssetBalance } from 'app/pages/accounts/pages/dashboard/components/TotalAssetBalance/TotalAssetBalance'
import { BlockchainWalletsCount } from 'app/pages/accounts/pages/dashboard/components/BlockchainWalletsCount/BlockchainWalletsCount'

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
  'app/pages/accounts/pages/dashboard/components/BlockchainWalletsCount/BlockchainWalletsCount',
  () => ({
    BlockchainWalletsCount: jest.fn(() => null)
  })
)

describe('TopInfoPanel', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(
      <TopInfoPanel
        accounts={[fakeVirtualAccountInfo]}
        balances={fakeBalancesInfo}
      />
    )
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
    expect(BlockchainWalletsCount).toHaveBeenCalledWith(
      { count: fakeBalancesInfo.withdrawalAddressCount },
      {}
    )
  })

  it('renders children with correct props when accounts is undefined', () => {
    render(<TopInfoPanel accounts={undefined} balances={fakeBalancesInfo} />)

    expect(AvailableCash).toHaveBeenCalledWith({ accounts: noAccountsInfo }, {})
  })

  it('renders children with correct props when balances is undefined', () => {
    render(
      <TopInfoPanel accounts={[fakeVirtualAccountInfo]} balances={undefined} />
    )

    expect(Investments).toHaveBeenCalledWith({ primary: undefined }, {})
    expect(TotalAssetBalance).toHaveBeenCalledWith({ value: undefined }, {})
    expect(BlockchainWalletsCount).toHaveBeenCalledWith(
      { count: undefined },
      {}
    )
  })
})
