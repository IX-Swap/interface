import React from 'react'
import { render } from 'test-utils'
import { listing } from '__fixtures__/listings'
import { generateQueryResult } from '__fixtures__/useQuery'
import * as useListing from 'app/pages/invest/hooks/useListing'
import { ViewListing } from 'app/pages/issuance/pages/SecondaryListings/ViewListing'
import { ListingDetails } from 'app/pages/issuance/components/ListingDetails/ListingDetails'

jest.mock(
  'app/pages/issuance/components/ListingDetails/ListingDetails',
  () => ({
    ListingDetails: jest.fn(() => null)
  })
)

describe('ViewListing', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders nested components with correct props when isLoading is true', () => {
    jest.spyOn(useListing, 'useListing').mockReturnValue(
      generateQueryResult({
        data: undefined,
        isLoading: true
      })
    )

    const { container } = render(<ViewListing />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders nested components with correct props when isLoading is false', () => {
    jest.spyOn(useListing, 'useListing').mockReturnValue(
      generateQueryResult({
        data: listing,
        isLoading: false
      })
    )

    render(<ViewListing />)

    expect(ListingDetails).toHaveBeenCalledWith(
      {
        data: listing
      },
      {}
    )
  })
})
