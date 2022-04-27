import React from 'react'
import { RootContainer } from 'ui/RootContainer'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { Grid } from '@mui/material'
import { ListingForm } from 'app/pages/exchange/components/ListingForm/ListingForm'

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
          <ListingForm isNew />
        </Grid>
      </RootContainer>
    </Grid>
  )
}
