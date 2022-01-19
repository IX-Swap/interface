import React from 'react'
import { Box, Button } from '@material-ui/core'
import { DigitalSecurityOffering } from 'types/dso'
import { useHistory, generatePath } from 'react-router-dom'

import { OTCMarketRoute } from 'app/pages/exchange/router/config'
import { ListingFinishLaterButton } from 'app/pages/exchange/components/ListingForm/ListinfFInishLaterButton'
import { getIdFromObj } from 'helpers/strings'
import { Listing } from 'app/pages/exchange/types/listings'

export interface ListingFormActionsProps {
  listing: DigitalSecurityOffering | Listing | undefined
  isDataFromDSO: boolean
}

export const ListingFormActions = (props: ListingFormActionsProps) => {
  const { listing, isDataFromDSO } = props
  const { push } = useHistory()

  return (
    <>
      {!(listing === undefined || isDataFromDSO) && (
        <Button
          variant={'contained'}
          color='primary'
          disableElevation
          onClick={() =>
            push(
              generatePath(OTCMarketRoute.previewListing, {
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
      <ListingFinishLaterButton
        isDataFromDSO={isDataFromDSO}
        listing={listing}
      />
    </>
  )
}
