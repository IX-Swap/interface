import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSView } from 'app/pages/accounts/pages/digitalSecurities/DSView/DSView'
import * as assetsData from 'hooks/asset/useAssetsData'
import * as balancesData from 'hooks/balance/useAllBalances'
import { QueryStatus } from 'react-query'
import { balance } from '__fixtures__/balance'
import { asset } from '__fixtures__/authorizer'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { history } from 'config/history'
import { DSRoute } from 'app/pages/accounts/pages/digitalSecurities/router'

describe('DSView', () => {
  const balanceId = balance.assetId

  beforeEach(() => {
    history.push(DSRoute.view, { balanceId })
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })
  afterAll(() => history.push('/'))

  it('renders without error', () => {
    jest
      .spyOn(assetsData, 'useAssetsData')
      .mockReturnValue(
        generateInfiniteQueryResult({ map: { [balance.assetId]: asset } })
      )
    jest
      .spyOn(balancesData, 'useAllBalances')
      .mockReturnValue(
        generateInfiniteQueryResult({ map: { [balanceId]: balance } })
      )

    render(<DSView />)
  })

  it('renders asset name,symbol & description', () => {
    jest
      .spyOn(assetsData, 'useAssetsData')
      .mockReturnValue(
        generateInfiniteQueryResult({ map: { [balance.assetId]: asset } })
      )
    jest
      .spyOn(balancesData, 'useAllBalances')
      .mockReturnValue(
        generateInfiniteQueryResult({ map: { [balanceId]: balance } })
      )

    const { container } = render(<DSView />)
    expect(container).toHaveTextContent(asset.name)
    expect(container).toHaveTextContent(asset.symbol)
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
        generateInfiniteQueryResult({ map: { [balanceId]: balance } })
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
