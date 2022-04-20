import React from 'react'
import { RootContainer } from 'ui/RootContainer'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { Grid } from '@mui/material'
import { ListingForm } from 'app/pages/issuance/components/ListingForm/ListingForm'

export const CreateListing = () => {
  return (
    <RootContainer>
      <Grid container direction='column'>
        <Grid item>
          <PageHeader
            title={'Create New Listing'}
            alignment='flex-start'
            showBreadcrumbs={true}
          />
        </Grid>
        <Grid item>
          <ListingForm isNew />
        </Grid>
      </Grid>
    </RootContainer>
  )
}
