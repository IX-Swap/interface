import React from 'react'
import { RootContainer } from 'ui/RootContainer'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { Grid } from '@mui/material'
import { ListingFormWrapper } from 'app/pages/issuance/components/ListingForm/ListingFormWrapper'

export const CreateListing = () => {
  return (
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item>
        <PageHeader
          title={'Create New Listing'}
          alignment='flex-start'
          showBreadcrumbs={true}
        />
      </Grid>
      <RootContainer>
        <Grid item>
          <ListingFormWrapper isNew />
        </Grid>
      </RootContainer>
    </Grid>
  )
}
