import React from 'react'
import { RootContainer } from 'ui/RootContainer'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { MyListingsTable } from 'app/pages/exchange/components/MyListingsTable/MyListingsTable'
import { Grid } from '@mui/material'

export const MyListings = () => {
  return (
    <Grid container style={{ display: 'table' }}>
      <PageHeader title={'My Listings'} showBreadcrumbs={true} />
      <RootContainer>
        <MyListingsTable />
      </RootContainer>
    </Grid>
  )
}
