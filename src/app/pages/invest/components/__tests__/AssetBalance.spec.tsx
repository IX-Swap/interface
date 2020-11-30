import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  AssetBalance,
  AssetBalanceProps
} from 'app/pages/invest/components/AssetBalance'
import * as useBalancesByAssetIdHook from 'hooks/balance/useBalancesByAssetId'
import { balance } from '__fixtures__/balance'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { asset } from '__fixtures__/authorizer'
import { LabelledValue } from 'components/LabelledValue'
import { formatMoney } from 'helpers/numbers'

jest.mock('components/LabelledValue', () => ({
  LabelledValue: jest.fn(() => null)
}))

describe('AssetBalance', () => {
  const props: AssetBalanceProps = { assetId: asset._id }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    jest
      .spyOn(useBalancesByAssetIdHook, 'useBalancesByAssetId')
      .mockReturnValue(
        generateInfiniteQueryResult({ map: { [asset._id]: balance } })
      )
    render(<AssetBalance {...props} />)
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

  it('renders LabelledValue with correct props', () => {
    jest
      .spyOn(useBalancesByAssetIdHook, 'useBalancesByAssetId')
      .mockReturnValue(
        generateInfiniteQueryResult({ map: { [asset._id]: balance } })
      )
    render(<AssetBalance {...props} />)

    expect(LabelledValue).toHaveBeenCalledTimes(1)
    expect(LabelledValue).toHaveBeenCalledWith(
      {
        label: 'Account Balance',
        value: formatMoney(balance.available, asset.numberFormat.currency)
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

    expect(LabelledValue).toHaveBeenCalledTimes(1)
    expect(LabelledValue).toHaveBeenCalledWith(
      {
        label: 'Account Balance',
        value: formatMoney(0, asset.numberFormat.currency)
      },
      {}
    )
  })
})
