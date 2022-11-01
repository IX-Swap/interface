import { Button, Grid, Typography } from '@mui/material'
import { AuthorizableStatus } from 'app/pages/authorizer/components/AuthorizableStatus'
import { SubmitListingButton } from 'app/pages/issuance/components/ListingDetails/SubmitListingButton'
import React from 'react'
import { generatePath, useHistory, useLocation } from 'react-router-dom'
import { ListingView } from 'types/listing'
import { IssuanceRoute } from 'app/pages/issuance/router/config'

export interface ListingStatusAndActionsProps {
  data: ListingView
}

export const ListingStatusAndActions = ({
  data
}: ListingStatusAndActionsProps) => {
  const { push } = useHistory()
  const { pathname } = useLocation()
  const extractPathname = pathname.split('/')
  const pathnameLength = extractPathname.slice(
    extractPathname.indexOf('secondary-listings') + 1,
    -1
  ).length

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
                pathnameLength > 1
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
    </Grid>
  )
}
