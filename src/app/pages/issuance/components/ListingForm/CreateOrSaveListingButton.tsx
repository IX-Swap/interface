import { Button } from '@mui/material'
import { getIdFromObj } from 'helpers/strings'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { DigitalSecurityOffering } from 'types/dso'
import { Listing, ListingFormValues } from 'app/pages/issuance/types/listings'
import { getUpdateListingPayload } from 'app/pages/issuance/utils/listing'
import { useCreateListing } from 'app/pages/issuance/hooks/useCreateListing'
import { useUpdateListing } from 'app/pages/issuance/hooks/useUpdateListing'
import { useAuth } from 'hooks/auth/useAuth'
import { ListingType } from 'app/pages/issuance/components/ListingForm/ListingDetails'

export interface CreateOrSaveListingButtonProps {
  listing: DigitalSecurityOffering | Listing | undefined
  listingType: null | ListingType
  isDataFromDSO: boolean
}

export const CreateOrSaveListingButton = (
  props: CreateOrSaveListingButtonProps
) => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { listing, isDataFromDSO, listingType } = props
  const listingId = getIdFromObj(listing)

  const { watch } = useFormContext<ListingFormValues>()
  const [createListing, { isLoading: isCreating }] = useCreateListing()
  const [updateListing, { isLoading: isUpdating }] = useUpdateListing(
    listingId,
    typeof listing?.user === 'string'
      ? listing?.user
      : getIdFromObj(listing?.user) ?? listing?.createdBy ?? ''
  )
  // TODO Needs to do refactoring for this payload after completed backend api
  const { dso, corporate, launchDate, asset, ...defaultFormValues } = watch()
  const formValues = getUpdateListingPayload({
    ...defaultFormValues,
    type: listingType,
    dsoId: dso,
    userId: userId,
    status: 'Draft'
  } as any)

  const handleClick =
    listing === undefined || isDataFromDSO
      ? async () => await createListing(formValues)
      : async () => await updateListing(formValues)

  return (
    <Button
      variant='contained'
      color='primary'
      onClick={handleClick}
      disabled={isCreating || isUpdating}
    >
      {listing === undefined || isDataFromDSO ? 'Create Listing' : 'Save'}
    </Button>
  )
}
