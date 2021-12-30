import React from 'react'
import { render } from 'test-utils'
import {
  CustodyDetailsDialog,
  getWalletsWithOrderedDetails
} from 'app/pages/admin/components/CustodyDetailsDialog/CustodyDetailsDialog'
import { generateQueryResult } from '__fixtures__/useQuery'
import * as useGetCustodianDetails from 'app/pages/admin/hooks/useGetCustodianDetails'
import { fakeCustodyDetails } from '__fixtures__/custodyAccount'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'

jest.mock('app/components/LoadingIndicator/LoadingIndicator', () => ({
  LoadingIndicator: jest.fn(() => null)
}))

describe('CustodyDetailsDialog', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<CustodyDetailsDialog />)
  })

  it('renders empty component when data is undefined', () => {
    jest
      .spyOn(useGetCustodianDetails, 'useGetCustodianDetails')
      .mockReturnValue(
        generateQueryResult({
          data: undefined,
          isLoading: false
        })
      )
    const { container } = render(<CustodyDetailsDialog />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders loading indicator component when data is loading', () => {
    jest
      .spyOn(useGetCustodianDetails, 'useGetCustodianDetails')
      .mockReturnValue(
        generateQueryResult({
          data: fakeCustodyDetails,
          isLoading: true
        })
      )
    render(<CustodyDetailsDialog />)
    expect(LoadingIndicator).toBeCalled()
  })

  it('renders data correctly', () => {
    jest
      .spyOn(useGetCustodianDetails, 'useGetCustodianDetails')
      .mockReturnValue(
        generateQueryResult({
          data: fakeCustodyDetails,
          isLoading: false
        })
      )
    const { getByTestId } = render(<CustodyDetailsDialog />)
    expect(getByTestId('content')).toHaveTextContent(
      JSON.stringify(
        {
          account_id: fakeCustodyDetails.account_id,
          account_name: fakeCustodyDetails.account_name,
          wallets: getWalletsWithOrderedDetails(fakeCustodyDetails.wallets)
        },
        null,
        1
      ).replace(/\n\s*/g, ' ')
    )
  })
})

describe('getWalletsWithOrderedDetails', () => {
  it('returns ordered wallets details', () => {
    expect(getWalletsWithOrderedDetails(fakeCustodyDetails.wallets)).toEqual([
      {
        asset_tickers: fakeCustodyDetails.wallets[0].asset_tickers,
        wallet_name: fakeCustodyDetails.wallets[0].wallet_name
      }
    ])
  })
})
