import { Grid } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { DetailsTab } from 'app/pages/exchange/market/components/ListingDetails/DetailsTab'
import { ListingHeader } from 'app/pages/exchange/market/components/ListingDetails/ListingHeader'
import React from 'react'
import { Listing } from 'types/listing'

export interface ListingDetailsProps {
  data?: Listing
}

export const ListingDetails = ({ data }: ListingDetailsProps) => {
  if (data === undefined) {
    return null
  }

  return (
    <Grid container direction='column' spacing={4}>
      <Grid item>
        <PageHeader title={data.name} showBreadcrumbs />
      </Grid>
      <Grid item>
        <ListingHeader />
      </Grid>
      <Grid item>
        <DetailsTab />
      </Grid>
    </Grid>
  )
}
