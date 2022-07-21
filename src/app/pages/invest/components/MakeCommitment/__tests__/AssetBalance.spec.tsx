import React from 'react'
import { render } from 'test-utils'
import {
  AssetBalance,
  AssetBalanceProps
} from 'app/pages/invest/components/MakeCommitment/AssetBalance'
import * as useBalancesByAssetIdHook from 'hooks/balance/useBalancesByAssetId'
import { balance } from '__fixtures__/balance'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { asset } from '__fixtures__/authorizer'
import { OverviewValue } from 'app/pages/invest/components/MakeCommitment/OverviewValue'
import { formatMoney } from 'helpers/numbers'

jest.mock('app/pages/invest/components/MakeCommitment/OverviewValue', () => ({
  OverviewValue: jest.fn(() => null)
}))

describe('AssetBalance', () => {
  const props: AssetBalanceProps = { assetId: asset._id, symbol: 'SGD' }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders nothing if loading', () => {
    jest
      .spyOn(useBalancesByAssetIdHook, 'useBalancesByAssetId')
      .mockReturnValue({
        ...generateInfiniteQueryResult({ map: { [asset._id]: balance } }),
        isLoading: true
      })
    const { container } = render(<AssetBalance {...props} />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders OverviewValue with correct props', () => {
    jest
      .spyOn(useBalancesByAssetIdHook, 'useBalancesByAssetId')
      .mockReturnValue(
        generateInfiniteQueryResult({ map: { [asset._id]: balance } })
      )
    render(<AssetBalance {...props} />)

    expect(OverviewValue).toHaveBeenCalledTimes(1)
    expect(OverviewValue).toHaveBeenCalledWith(
      {
        label: 'Available Balance',
        value: formatMoney(balance.available, balance.symbol)
      },
      {}
    )
  })

  it('renders LabelledValue with correct props if balance.available is undefined', () => {
    jest
      .spyOn(useBalancesByAssetIdHook, 'useBalancesByAssetId')
      .mockReturnValue(
        generateInfiniteQueryResult({
          map: { [asset._id]: { ...balance, available: undefined } }
        })
      )
    render(<AssetBalance {...props} />)

    expect(OverviewValue).toHaveBeenCalledTimes(1)
    expect(OverviewValue).toHaveBeenCalledWith(
      {
        label: 'Available Balance',
        value: formatMoney(0, balance.symbol)
      },
      {}
    )
  })
})
