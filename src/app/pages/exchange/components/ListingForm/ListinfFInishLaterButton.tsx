import { Button } from '@mui/material'
import { getIdFromObj } from 'helpers/strings'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { DigitalSecurityOffering } from 'types/dso'
import { Listing, ListingFormValues } from 'app/pages/exchange/types/listings'
import { getUpdateListingPayload } from 'app/pages/exchange/utils/listing'
import { useCreateListing } from 'app/pages/exchange/hooks/useCreateListing'
import { useUpdateListing } from 'app/pages/exchange/hooks/useUpdateListing'

export interface ListingFinishLaterButtonProps {
  listing: DigitalSecurityOffering | Listing | undefined
  isDataFromDSO: boolean
}

export const ListingFinishLaterButton = (
  props: ListingFinishLaterButtonProps
) => {
  const { listing, isDataFromDSO } = props
  const listingId = getIdFromObj(listing)

  const { watch } = useFormContext<ListingFormValues>()
  const [createListing, { isLoading: isCreating }] = useCreateListing()
  const [updateListing, { isLoading: isUpdating }] = useUpdateListing(
    listingId,
    typeof listing?.user === 'string'
      ? listing?.user
      : getIdFromObj(listing?.user) ?? listing?.createdBy ?? ''
  )
  const formValues = getUpdateListingPayload({
    ...watch(),
    status: 'Draft'
  } as any)

  const handleClick =
    listing === undefined || isDataFromDSO
      ? async () => await createListing(formValues)
      : async () => await updateListing(formValues)

  return (
    <Button
      variant='outlined'
      color='primary'
      onClick={handleClick}
      disabled={isCreating || isUpdating}
    >
      {listing === undefined || isDataFromDSO ? 'Save Draft' : 'Save'}
    </Button>
  )
}
