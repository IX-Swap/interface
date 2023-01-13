import React from 'react'
import { Button } from '@mui/material'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { useFormContext } from 'react-hook-form'
import { DigitalSecurityOffering } from 'types/dso'
import { getUpdateListingPayload } from 'app/pages/issuance/utils/listing'
import { useCreateListing } from 'app/pages/issuance/hooks/useCreateListing'
import { useUpdateListing } from 'app/pages/issuance/hooks/useUpdateListing'
import { Listing, ListingFormValues } from 'app/pages/issuance/types/listings'
import { LISTING_TYPES } from '../../consts/listing'

// import { ListingType } from 'app/pages/issuance/components/ListingForm/ListingDetails'

export interface CreateOrSaveListingButtonProps {
  listing: DigitalSecurityOffering | Listing | undefined
  listingType?: LISTING_TYPES | any
  // listingType?: null | string | undefined
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
  const [createListing, { isLoading: isCreating }] =
    useCreateListing(listingType)
  const [updateListing, { isLoading: isUpdating }] = useUpdateListing(
    listingId,
    typeof listing?.user === 'string'
      ? listing?.user
      : getIdFromObj(listing?.user) ?? listing?.createdBy ?? '',
    listing?.listingType
  )
  // console.log(listing, 'list')
  const { dso, ...defaultFormValues } = watch()
  const payload = {
    // ...listing,
    ...defaultFormValues,
    corporate: listing?.corporate._id,
    asset: listing?.asset,
    logo: listing?.logo,
    completionDate: listing?.completionDate,
    investmentPeriod: listing?.investmentPeriod,
    dividendYield: listing?.dividendYield,
    interestRate: listing?.interestRate,
    grossIRR: listing?.grossIRR,
    investmentStructure: listing?.investmentStructure,
    distributionFrequency: listing?.distributionFrequency,
    leverage: listing?.leverage,
    equityMultiple: listing?.equityMultiple,
    maximumTradeUnits: listing?.maximumTradeUnits,
    raisedAmount: listing?.raisedAmount,
    minimumTradeUnits: listing?.minimumTradeUnits,
    introduction: listing?.introduction,
    team: listing?.team,
    // type: listingType when creating a new listing
    // type: listing?.listingType when eddting a listing
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    type: listingType || listing?.listingType,
    dso: dso,
    userId: userId
  } as any

  const formValues = getUpdateListingPayload(payload)

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
