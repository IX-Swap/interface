import React from 'react'
import { render } from 'test-utils'
import { PromotedDSOs } from 'app/components/DSO/components/PromotedDSOs'
import * as usePromotedDSOsHook from 'app/pages/invest/hooks/usePromotedDSOs'
import { generateInfiniteQueryResult } from '__fixtures__/useQuery'
import { QueryStatus } from 'react-query'
import { dso } from '__fixtures__/authorizer'
import { InvestRoute } from 'app/pages/invest/router/config'
import { OTCMarketCard } from 'app/pages/invest/components/OTCMarketCard/OTCMarketCard'

jest.mock('app/pages/invest/components/OTCMarketCard/OTCMarketCard', () => ({
  OTCMarketCard: jest.fn(() => null)
}))

describe('PromotedDSOs', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    jest.spyOn(usePromotedDSOsHook, 'usePromotedDSOs').mockReturnValue(
      generateInfiniteQueryResult({
        queryStatus: QueryStatus.Success
      })
    )

    render(<PromotedDSOs />)
  })

  it('renders nothing if loading', () => {
    jest.spyOn(usePromotedDSOsHook, 'usePromotedDSOs').mockReturnValue(
      generateInfiniteQueryResult({
        queryStatus: QueryStatus.Loading
      })
    )

    const { container } = render(<PromotedDSOs />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders OTCMarketCard with correct props', () => {
    jest.spyOn(usePromotedDSOsHook, 'usePromotedDSOs').mockReturnValue(
      generateInfiniteQueryResult({
        list: [dso]
      })
    )

    render(<PromotedDSOs />)

    expect(OTCMarketCard).toHaveBeenCalledTimes(1)
    expect(OTCMarketCard).toHaveBeenCalledWith(
      {
        data: dso,
        viewURL: InvestRoute.view,
        type: 'TopOffers'
      },
      {}
    )
  })
})
