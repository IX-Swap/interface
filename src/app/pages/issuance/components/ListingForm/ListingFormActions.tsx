import React from 'react'
import { Box, Button } from '@mui/material'
import { DigitalSecurityOffering } from 'types/dso'
import { useHistory, generatePath } from 'react-router-dom'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { CreateOrSaveListingButton } from 'app/pages/issuance/components/ListingForm/CreateOrSaveListingButton'
import { getIdFromObj } from 'helpers/strings'
import { Listing } from 'app/pages/issuance/types/listings'
import { LISTING_TYPES } from '../../consts/listing'

export interface ListingFormActionsProps {
  listing: DigitalSecurityOffering | Listing | undefined
  isDataFromDSO: boolean
  listingType?: LISTING_TYPES | any
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
            push({
              pathname:
                listing?.listingType === 'OTC'
                  ? generatePath(IssuanceRoute.previewOTCListing, {
                      OTCListingId: listing?._id,
                      UserId:
                        typeof listing?.user === 'string'
                          ? listing?.user
                          : getIdFromObj(listing?.user)
                    })
                  : generatePath(IssuanceRoute.previewListing, {
                      listingId: listing?._id
                      // listingType: listing?.listingType
                    })
            })
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
