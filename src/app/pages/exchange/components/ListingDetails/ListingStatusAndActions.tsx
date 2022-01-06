import { Button, Grid, Typography } from '@material-ui/core'
import { AuthorizableStatus } from 'app/pages/authorizer/components/AuthorizableStatus'
import { SubmitListingButton } from 'app/pages/exchange/components/ListingDetails/SubmitListingButton'
import { OTCMarketRoute } from 'app/pages/exchange/router/config'
import React from 'react'
import { generatePath, useHistory } from 'react-router-dom'
import { ListingView } from 'types/listing'

export interface ListingStatusAndActionsProps {
  data: ListingView
}

export const ListingStatusAndActions = ({
  data
}: ListingStatusAndActionsProps) => {
  const { push } = useHistory()

  return (
    <Grid container spacing={6} direction='column'>
      <Grid
        item
        container
        spacing={1}
        justifyContent='flex-end'
        alignItems='center'
      >
        <Grid item>
          <Typography variant='body1' color='textSecondary'>
            Status:{' '}
          </Typography>
        </Grid>
        <Grid item>
          <AuthorizableStatus compact={false} status={data.status} />
        </Grid>
      </Grid>
      <Grid item container spacing={1} justifyContent='flex-end'>
        <Grid item>
          <Button
            variant='outlined'
            color='primary'
            disableElevation
            onClick={() =>
              push(
                generatePath(OTCMarketRoute.editListing, {
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
    </Grid>
  )
}
