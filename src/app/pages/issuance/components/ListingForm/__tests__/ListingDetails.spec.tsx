import * as React from 'react'
import { render } from 'test-utils'
import {
  ListingDetails,
  radioButtonsList
} from 'app/pages/issuance/components/ListingForm/ListingDetails'
import { fireEvent, waitFor } from '@testing-library/dom'
import { LISTING_TYPES } from 'app/pages/issuance/consts/listing'

describe('ListingDetails', () => {
  const setListPlace = jest.fn()
  const onImportClick = jest.fn()

  it('invokes setListPlace on radio button wrapper click', async () => {
    const { getAllByTestId } = render(
      <ListingDetails
        listingType={LISTING_TYPES.OTC}
        setListingType={setListPlace}
        onImportClick={onImportClick}
      />
    )

    fireEvent.click(getAllByTestId('buttonWrapper')[0])
    await waitFor(() => {
      expect(setListPlace).toHaveBeenCalledWith(radioButtonsList[0].value)
    })

    fireEvent.click(getAllByTestId('buttonWrapper')[1])
    await waitFor(() => {
      expect(setListPlace).toHaveBeenCalledWith(radioButtonsList[1].value)
    })

    fireEvent.click(getAllByTestId('buttonWrapper')[2])
    await waitFor(() => {
      expect(setListPlace).toHaveBeenCalledWith(radioButtonsList[2].value)
    })
  })
})
