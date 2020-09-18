/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DSView } from 'v2/app/pages/accounts/pages/digitalSecurities/DSView/DSView'
import * as assetsData from 'v2/hooks/asset/useAssetsData'
import * as balancesData from 'v2/hooks/balance/useAllBalances'
import { QueryStatus } from 'react-query'
import { balance } from '__fixtures__/balance'
import { asset } from '__fixtures__/authorizer'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ balanceId: 'testId' })
}))

describe('DSView', () => {
  const balances = { map: { testId: balance } }
  const assets = { map: { [balance.assetId]: asset } }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    jest.spyOn(assetsData, 'useAssetsData').mockImplementation(() => ({
      data: assets,
      status: QueryStatus.Success
    }))
    jest.spyOn(balancesData, 'useAllBalances').mockImplementation(() => ({
      data: balances,
      status: QueryStatus.Success
    }))

    render(<DSView />)
  })

  it('renders asset description', () => {
    jest.spyOn(assetsData, 'useAssetsData').mockImplementation(() => ({
      data: assets,
      status: QueryStatus.Success
    }))
    jest.spyOn(balancesData, 'useAllBalances').mockImplementation(() => ({
      data: balances,
      status: QueryStatus.Success
    }))

    const { container } = render(<DSView />)
    expect(container).toHaveTextContent(asset.description)
  })

  it('renders nothing if balancesStatus is loading', () => {
    jest.spyOn(assetsData, 'useAssetsData').mockImplementation(() => ({
      data: assets,
      status: QueryStatus.Loading
    }))
    jest.spyOn(balancesData, 'useAllBalances').mockImplementation(() => ({
      data: balances,
      status: QueryStatus.Success
    }))

    const { container } = render(<DSView />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing if assetsStatus is loading', () => {
    jest.spyOn(assetsData, 'useAssetsData').mockImplementation(() => ({
      data: assets,
      status: QueryStatus.Success
    }))
    jest.spyOn(balancesData, 'useAllBalances').mockImplementation(() => ({
      data: balances,
      status: QueryStatus.Loading
    }))

    const { container } = render(<DSView />)
    expect(container).toBeEmptyDOMElement()
  })
})
