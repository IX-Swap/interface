import { Button, Grid } from '@mui/material'
import { SubmitListingButton } from 'app/pages/issuance/components/ListingDetails/SubmitListingButton'
import React from 'react'
import { generatePath, useHistory } from 'react-router-dom'
import { ListingView } from 'types/listing'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { LISTING_TYPES } from '../../consts/listing'

export interface ListingActionsProps {
  data: ListingView
}

export const ListingActions = ({ data }: ListingActionsProps) => {
  const { push } = useHistory()

  return (
    <Grid
      item
      container
      sx={{
        justifyContent: { xs: 'center', md: 'end' }
      }}
    >
      <Grid item>
        <Button
          variant='outlined'
          color='primary'
          disableElevation
          onClick={() =>
            push(
              data?.listingType === LISTING_TYPES.OTC
                ? generatePath(IssuanceRoute.editOTCListing, {
                    UserId: data.user,
                    OTCListingId: data._id
                  })
                : generatePath(IssuanceRoute.editListing, {
                    listingId: data._id
                  })
            )
          }
        >
          Edit
        </Button>
      </Grid>
      <Grid item>
        <SubmitListingButton data={data} />
      </Grid>
    </Grid>
  )
}
