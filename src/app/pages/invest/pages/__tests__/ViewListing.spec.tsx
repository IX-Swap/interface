import React from 'react'
import { render } from 'test-utils'
import * as useListing from 'app/pages/invest/hooks/useListing'
import { listing } from '__fixtures__/listings'
import { ViewListing } from 'app/pages/invest/pages/ViewListing'
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

  it('renders nothing if loading', () => {
    jest
      .spyOn(useListing, 'useListing')
      .mockReturnValue({ isLoading: true, data: listing } as any)
    const { container } = render(<ViewListing />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing when loading loading is false and data is undefined', () => {
    jest
      .spyOn(useListing, 'useListing')
      .mockReturnValue({ isLoading: false, data: undefined } as any)
    const { container } = render(<ViewListing />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders ListingDetails component when loading is false and data is not undefined', () => {
    jest
      .spyOn(useListing, 'useListing')
      .mockReturnValue({ isLoading: false, data: listing } as any)
    render(<ViewListing />)

    expect(ListingDetails).toHaveBeenCalledWith(
      {
        withoutActions: true,
        data: listing
      },
      {}
    )
  })
})
