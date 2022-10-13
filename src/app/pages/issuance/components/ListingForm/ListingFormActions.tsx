import React from 'react'
import { Box, Button } from '@mui/material'
import { DigitalSecurityOffering } from 'types/dso'
import { useHistory, generatePath } from 'react-router-dom'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { CreateOrSaveListingButton } from 'app/pages/issuance/components/ListingForm/CreateOrSaveListingButton'
import { getIdFromObj } from 'helpers/strings'
import { Listing } from 'app/pages/issuance/types/listings'
// import { ListingType } from 'app/pages/issuance/components/ListingForm/ListingDetails'

export interface ListingFormActionsProps {
  listing: DigitalSecurityOffering | Listing | undefined
  isDataFromDSO: boolean
  // listingType?: null | ListingType | undefined
  listingType?: null | string | undefined
}

export const ListingFormActions = (props: ListingFormActionsProps) => {
  const { listing, isDataFromDSO, listingType } = props
  const { push } = useHistory()

  // TODO Needs to do refactoring this component for edit listing page
  return (
    <>
      {!(listing === undefined || isDataFromDSO) && (
        <Button
          variant={'contained'}
          color='primary'
          disableElevation
          onClick={() =>
            push(
              generatePath(IssuanceRoute.previewListing, {
                listingId: listing?._id,
                issuerId:
                  typeof listing?.user === 'string'
                    ? listing?.user
                    : getIdFromObj(listing?.user)
              })
            )
          }
        >
          Preview
        </Button>
      )}
      <Box mx={1} component='span' />
      <CreateOrSaveListingButton
        isDataFromDSO={isDataFromDSO}
        listing={listing}
        listingType={listingType}
      />
    </>
  )
}
