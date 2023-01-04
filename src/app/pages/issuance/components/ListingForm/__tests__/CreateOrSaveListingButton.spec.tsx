import * as React from 'react'
import { render } from 'test-utils'
import { fireEvent, waitFor } from '@testing-library/dom'
import { CreateOrSaveListingButton } from 'app/pages/issuance/components/ListingForm/CreateOrSaveListingButton'
import * as useUpdateListing from 'app/pages/issuance/hooks/useUpdateListing'
import * as useCreateListing from 'app/pages/issuance/hooks/useCreateListing'
import * as useFormContext from 'react-hook-form'

describe('CreateOrSaveListingButton', () => {
  const createListing = jest.fn()
  const updateListing = jest.fn()
  const objFormContext = {
    watch: () => ({})
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    jest
      .spyOn(useFormContext, 'useFormContext')
      .mockImplementation(() => objFormContext as any)
  })

  it('render disabled button when isCreating is true ', () => {
    jest
      .spyOn(useCreateListing, 'useCreateListing')
      .mockReturnValue([createListing, { isLoading: true }] as any)

    jest
      .spyOn(useUpdateListing, 'useUpdateListing')
      .mockReturnValue([updateListing, { isLoading: false }] as any)

    const { getByText } = render(
      <CreateOrSaveListingButton
        listingType={'OTC'}
        listing={{} as any}
        isDataFromDSO={false}
      />
    )

    const button = getByText('Save')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('disabled')
  })

  it('render disabled button when isUpdating is true ', () => {
    jest
      .spyOn(useCreateListing, 'useCreateListing')
      .mockReturnValue([createListing, { isLoading: false }] as any)

    jest
      .spyOn(useUpdateListing, 'useUpdateListing')
      .mockReturnValue([updateListing, { isLoading: true }] as any)

    const { getByText } = render(
      <CreateOrSaveListingButton
        listingType={'OTC'}
        listing={{} as any}
        isDataFromDSO={false}
      />
    )

    const button = getByText('Save')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('disabled')
  })

  it('invokes createListing on button click if listing is undefined', async () => {
    jest
      .spyOn(useCreateListing, 'useCreateListing')
      .mockReturnValue([createListing, { isLoading: false }] as any)
    jest
      .spyOn(useUpdateListing, 'useUpdateListing')
      .mockReturnValue([updateListing, { isLoading: false }] as any)

    const { getByText } = render(
      <CreateOrSaveListingButton
        listingType={'OTC'}
        listing={undefined}
        isDataFromDSO={false}
      />
    )

    const button = getByText('Create Listing')
    expect(button).toBeInTheDocument()
    expect(button).not.toHaveAttribute('disabled')

    fireEvent.click(button)
    await waitFor(() => {
      expect(createListing).toBeCalled()
      expect(updateListing).not.toBeCalled()
    })
  })

  it('invokes createListing on button click if isDataFromDSO is true', async () => {
    jest
      .spyOn(useCreateListing, 'useCreateListing')
      .mockReturnValue([createListing, { isLoading: false }] as any)

    jest
      .spyOn(useUpdateListing, 'useUpdateListing')
      .mockReturnValue([updateListing, { isLoading: false }] as any)

    const { getByText } = render(
      <CreateOrSaveListingButton
        listingType={'OTC'}
        listing={{} as any}
        isDataFromDSO={true}
      />
    )

    const button = getByText('Create Listing')
    expect(button).toBeInTheDocument()
    expect(button).not.toHaveAttribute('disabled')

    fireEvent.click(button)
    await waitFor(() => {
      expect(createListing).toBeCalled()
      expect(updateListing).not.toBeCalled()
    })
  })

  it('invokes updateListing on button click if isDataFromDSO is false and listing is not undefined', async () => {
    jest
      .spyOn(useCreateListing, 'useCreateListing')
      .mockReturnValue([createListing, { isLoading: false }] as any)

    jest
      .spyOn(useUpdateListing, 'useUpdateListing')
      .mockReturnValue([updateListing, { isLoading: false }] as any)

    const { getByText } = render(
      <CreateOrSaveListingButton
        listingType={'OTC'}
        listing={{} as any}
        isDataFromDSO={false}
      />
    )

    const button = getByText('Save')
    expect(button).toBeInTheDocument()
    expect(button).not.toHaveAttribute('disabled')

    fireEvent.click(button)
    await waitFor(() => {
      expect(updateListing).toBeCalled()
      expect(createListing).not.toBeCalled()
    })
  })
})
