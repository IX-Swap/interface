import { ListingDetails } from 'app/pages/issuance/components/ListingDetails/ListingDetails'
import { useListing, useListingOTC } from 'app/pages/invest/hooks/useListing'
import { Grid } from '@mui/material'
import React from 'react'
import { RootContainer } from 'ui/RootContainer'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

export const ViewListing = () => {
  const { data, isLoading } = useListing()

  if (isLoading) {
    return null
  }

  return (
    <Grid container direction='column' spacing={4} display='table'>
      <Grid item>
        <PageHeader title={data?.tokenName} />
      </Grid>

      <Grid item style={{ paddingTop: 0 }}>
        <RootContainer>
          <Grid container spacing={6} wrap='wrap-reverse'>
            <Grid item xs={12}>
              <Grid container direction='column'>
                <Grid item>
                  <ListingDetails data={data} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </RootContainer>
      </Grid>
    </Grid>
  )
}

export const ViewListingOTC = () => {
  const { data, isLoading } = useListingOTC()

  if (isLoading) {
    return null
  }

  return <ListingDetails data={data} />
}
