import {
  BasicOverview,
  BasicOverviewProps
} from 'app/pages/exchange/components/ListingDetails/Overview/BasicOverview'
import React from 'react'
import { render } from 'test-utils'
import { listing } from '__fixtures__/listings'

describe('BasicOverview', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    const props: BasicOverviewProps = {
      networkName: listing.network.name,
      capitalStructure: listing.capitalStructure,
      launchDate: listing.launchDate,
      completionDate: listing.completionDate,
      decimalPlaces: listing.decimalPlaces,
      tokenAddress: '1234'
    }
    render(<BasicOverview {...props} />)
  })
})
