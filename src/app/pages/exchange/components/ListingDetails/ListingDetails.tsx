import { Grid } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { DetailsTab } from 'app/pages/exchange/components/ListingDetails/DetailsTab'
import { ListingHeader } from 'app/pages/exchange/components/ListingDetails/ListingHeader'
import { ListingStatusAndActions } from 'app/pages/exchange/components/ListingDetails/ListingStatusAndActions'
import React from 'react'
import { ListingView } from 'types/listing'

export interface ListingDetailsProps {
  data?: ListingView
  withoutActions?: boolean
}

export const ListingDetails = ({
  data,
  withoutActions = false
}: ListingDetailsProps) => {
  if (data === undefined) {
    return null
  }

  return (
    <Grid container direction='column' spacing={4}>
      <Grid item>
        <PageHeader title={data.tokenName} showBreadcrumbs />
      </Grid>
      <Grid item container justify='flex-end' spacing={1}>
        <Grid item xs={12} sm={8}>
          <ListingHeader
            logoId={data.logo}
            name={data.tokenName}
            symbol={data.tokenSymbol}
            companyName={data.corporate.companyLegalName}
            markets={data.markets}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          {!withoutActions ? <ListingStatusAndActions data={data} /> : null}
        </Grid>
      </Grid>
      <Grid item>
        <DetailsTab data={data} />
      </Grid>
    </Grid>
  )
}
