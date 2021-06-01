import { Grid } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { DetailsTab } from 'app/pages/exchange/market/components/ListingDetails/DetailsTab'
import { ListingHeader } from 'app/pages/exchange/market/components/ListingDetails/ListingHeader'
import React from 'react'
import { ListingView } from 'types/listing'

export interface ListingDetailsProps {
  data?: ListingView
}

export const ListingDetails = ({ data }: ListingDetailsProps) => {
  if (data === undefined) {
    return null
  }

  return (
    <Grid container direction='column' spacing={4}>
      <Grid item>
        <PageHeader title={data.tokenName} showBreadcrumbs />
      </Grid>
      <Grid item>
        <ListingHeader
          logoId={data.logo}
          name={data.tokenName}
          symbol={data.tokenSymbol}
          companyName={data.corporate.companyLegalName}
          markets={data.markets}
        />
      </Grid>
      <Grid item>
        <DetailsTab data={data} />
      </Grid>
    </Grid>
  )
}
