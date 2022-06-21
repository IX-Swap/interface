import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { DetailsTab } from 'app/pages/issuance/components/ListingDetails/DetailsTab'
import { ListingHeader } from 'app/pages/issuance/components/ListingDetails/ListingHeader'
import { ListingStatusAndActions } from 'app/pages/issuance/components/ListingDetails/ListingStatusAndActions'
import React from 'react'
import { ListingView } from 'types/listing'
import { RootContainer } from 'ui/RootContainer'

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
    <Grid container direction='column' spacing={4} style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title={data.tokenName} showBreadcrumbs />
      </Grid>

      <Grid item container justifyContent='flex-end' spacing={1} pl={4}>
        <RootContainer>
          <Grid item xs={12} sm={8}>
            <ListingHeader
              logoId={data.logo}
              name={data.tokenName}
              symbol={data.tokenSymbol}
              companyName={data.corporate?.companyLegalName}
              markets={data.markets}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            {!withoutActions ? <ListingStatusAndActions data={data} /> : null}
          </Grid>
        </RootContainer>
      </Grid>
      <Grid item pl={4}>
        <RootContainer>
          <DetailsTab data={data} />
        </RootContainer>
      </Grid>
    </Grid>
  )
}
