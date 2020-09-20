/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSView } from 'v2/app/pages/accounts/pages/digitalSecurities/DSView/DSView'
import * as assetsData from 'v2/hooks/asset/useAssetsData'
import * as balancesData from 'v2/hooks/balance/useAllBalances'
import { QueryStatus } from 'react-query'
import { balance } from '__fixtures__/balance'
import { asset } from '__fixtures__/authorizer'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ balanceId: 'testId' })
}))

describe('DSView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    jest
      .spyOn(assetsData, 'useAssetsData')
      .mockReturnValue(
        generateInfiniteQueryResult({ map: { [balance.assetId]: asset } })
      )
    jest
      .spyOn(balancesData, 'useAllBalances')
      .mockReturnValue(
        generateInfiniteQueryResult({ map: { testId: balance } })
      )

    render(<DSView />)
  })

  it('renders asset description', () => {
    jest
      .spyOn(assetsData, 'useAssetsData')
      .mockReturnValue(
        generateInfiniteQueryResult({ map: { [balance.assetId]: asset } })
      )
    jest
      .spyOn(balancesData, 'useAllBalances')
      .mockReturnValue(
        generateInfiniteQueryResult({ map: { testId: balance } })
      )

    const { container } = render(<DSView />)
    expect(container).toHaveTextContent(asset.description)
  })

  it('renders nothing if assetsStatus is loading', () => {
    jest.spyOn(assetsData, 'useAssetsData').mockReturnValue(
      generateInfiniteQueryResult({
        map: { [balance.assetId]: asset },
        queryStatus: QueryStatus.Loading
      })
    )
    jest
      .spyOn(balancesData, 'useAllBalances')
      .mockReturnValue(
        generateInfiniteQueryResult({ map: { testId: balance } })
      )

    const { container } = render(<DSView />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing if balancesStatus is loading', () => {
    jest
      .spyOn(assetsData, 'useAssetsData')
      .mockReturnValue(
        generateInfiniteQueryResult({ map: { [balance.assetId]: asset } })
      )
    jest.spyOn(balancesData, 'useAllBalances').mockReturnValue(
      generateInfiniteQueryResult({
        map: { testId: balance },
        queryStatus: QueryStatus.Loading
      })
    )

    const { container } = render(<DSView />)
    expect(container).toBeEmptyDOMElement()
  })
})
