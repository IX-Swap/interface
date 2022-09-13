import React from 'react'
import { render } from 'test-utils'
import { EditListing } from 'app/pages/issuance/pages/MyListings/EditListing'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { ListingFormWrapper } from 'app/pages/issuance/components/ListingForm/ListingFormWrapper'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import * as useListingById from 'app/pages/issuance/hooks/useListingById'

jest.mock('app/components/LoadingIndicator/LoadingIndicator', () => ({
  LoadingIndicator: jest.fn(() => null)
}))
jest.mock('app/components/PageHeader/PageHeader', () => ({
  PageHeader: jest.fn(() => null)
}))
jest.mock(
  'app/pages/issuance/components/ListingForm/ListingFormWrapper',
  () => ({
    ListingFormWrapper: jest.fn(() => null)
  })
)

describe('EditListing', () => {
  const data = undefined

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders correct components when isLoading is true', () => {
    jest.spyOn(useListingById, 'useListingById').mockReturnValue({
      data: data,
      isLoading: true
    } as any)

    render(<EditListing />)

    expect(PageHeader).toHaveBeenCalledWith(
      {
        title: 'Edit Listing',
        alignment: 'flex-start',
        showBreadcrumbs: true
      },
      {}
    )
    expect(LoadingIndicator).toHaveBeenCalledTimes(1)
    expect(ListingFormWrapper).toHaveBeenCalledTimes(0)
  })

  it('renders correct components when isLoading is false', () => {
    jest.spyOn(useListingById, 'useListingById').mockReturnValue({
      data: data,
      isLoading: false
    } as any)

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
    expect(ListingFormWrapper).toHaveBeenCalledWith({ data: data }, {})
  })
})
