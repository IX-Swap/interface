import {
  BasicOverview,
  BasicOverviewProps
} from 'app/pages/exchange/components/ListingDetails/Overview/BasicOverview'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { listing } from '__fixtures__/listings'

describe('BasicOverview', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
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
