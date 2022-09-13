import React from 'react'
import { render } from 'test-utils'
import { listing } from '__fixtures__/listings'
import { generateQueryResult } from '__fixtures__/useQuery'
import * as useListingById from 'app/pages/issuance/hooks/useListingById'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { EditListing } from 'app/pages/issuance/pages/SecondaryListings/EditListing'
import { ListingFormWrapper } from 'app/pages/issuance/components/ListingForm/ListingFormWrapper'

jest.mock('app/components/PageHeader/PageHeader', () => ({
  PageHeader: jest.fn(() => null)
}))

jest.mock('app/components/LoadingIndicator/LoadingIndicator', () => ({
  LoadingIndicator: jest.fn(() => null)
}))

jest.mock(
  'app/pages/issuance/components/ListingForm/ListingFormWrapper',
  () => ({
    ListingFormWrapper: jest.fn(() => null)
  })
)

describe('EditListing', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders nested components with correct props when isLoading is true', () => {
    jest.spyOn(useListingById, 'useListingById').mockReturnValue(
      generateQueryResult({
        data: undefined,
        isLoading: true
      })
    )

    render(<EditListing />)

    expect(LoadingIndicator).toHaveBeenCalled()
    expect(PageHeader).toHaveBeenCalledWith(
      {
        title: 'Edit Listing',
        alignment: 'flex-start',
        showBreadcrumbs: true
      },
      {}
    )
  })

  it('renders nested components with correct props when isLoading is false', () => {
    jest.spyOn(useListingById, 'useListingById').mockReturnValue(
      generateQueryResult({
        data: listing,
        isLoading: false
      })
    )

    render(<EditListing />)

    expect(PageHeader).toHaveBeenCalledWith(
      {
        title: 'Edit Listing',
        alignment: 'flex-start',
        showBreadcrumbs: true
      },
      {}
    )
    expect(LoadingIndicator).toHaveBeenCalledTimes(0)
    expect(ListingFormWrapper).toHaveBeenCalledWith(
      {
        data: listing
      },
      {}
    )
  })
})
