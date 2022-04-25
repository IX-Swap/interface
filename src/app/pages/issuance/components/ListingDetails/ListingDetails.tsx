import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { DetailsTab } from 'app/pages/issuance/components/ListingDetails/DetailsTab'
import { ListingHeader } from 'app/pages/issuance/components/ListingDetails/ListingHeader'
import { ListingStatusAndActions } from 'app/pages/issuance/components/ListingDetails/ListingStatusAndActions'
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
      <Grid item container justifyContent='flex-end' spacing={1}>
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
