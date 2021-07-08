import {
  OfferingTerms,
  OfferingTermsProps
} from 'app/pages/exchange/components/ListingDetails/Overview/OfferingTerms'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { listing } from '__fixtures__/listings'

describe('OfferingTerms', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    const props: OfferingTermsProps = {
      investmentPeriod: listing.investmentPeriod,
      dividendYield: listing.dividendYield,
      investmentStructure: listing.investmentStructure,
      grossIrr: listing.grossIRR,
      equityMultiple: listing.equityMultiple,
      distributionFrequency: listing.distributionFrequency
    }
    render(<OfferingTerms {...props} />)
  })
})
