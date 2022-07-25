import React from 'react'
import { render } from 'test-utils'
import {
  AssetBalance,
  AssetBalanceProps
} from 'app/pages/invest/components/MakeCommitment/AssetBalance'
import * as useCurrencyBalanceHook from 'app/pages/invest/hooks/useCurrencyBalance'
import { balance } from '__fixtures__/balance'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { asset } from '__fixtures__/authorizer'
import { OverviewValue } from 'app/pages/invest/components/MakeCommitment/OverviewValue'
import { formatMoney } from 'helpers/numbers'

jest.mock('app/pages/invest/components/MakeCommitment/OverviewValue', () => ({
  OverviewValue: jest.fn(() => null)
}))

describe('AssetBalance', () => {
  const props: AssetBalanceProps = { symbol: 'SGD' }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders no balance component when balance is 0', () => {
    jest.spyOn(useCurrencyBalanceHook, 'useCurrencyBalance').mockReturnValue(0)
    const { getByText } = render(<AssetBalance {...props} />)

    expect(getByText("You don't have enough money")).toBeTruthy()
  })

  it('renders OverviewValue with correct props', () => {
    jest
      .spyOn(useCurrencyBalanceHook, 'useCurrencyBalance')
      .mockReturnValue(100)
    render(<AssetBalance {...props} />)

    expect(OverviewValue).toHaveBeenCalledTimes(1)
    expect(OverviewValue).toHaveBeenCalledWith(
      {
        label: 'Available Balance',
        value: formatMoney(100, 'SGD')
      },
      {}
    )
  })
})
