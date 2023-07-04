import { Box, Grid } from '@mui/material'
// import { BackLink } from 'app/components/BackLink/BackLink'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { PrimaryOfferings as PrimaryOfferingsList } from 'app/pages/invest/components/PrimaryOfferings'
import React from 'react'
import { RootContainer } from 'ui/RootContainer'
// import { InvestRoute } from '../router/config'

export const PrimaryOfferings = () => {
  return (
    <Box width='100%'>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <PageHeader
            title='Primary Offerings'
            // endComponent={
            //   <BackLink to={InvestRoute.overview} title='Back to Overview' />
            // }
          />
        </Grid>
        <Grid item xs={12}>
          <RootContainer>
            <PrimaryOfferingsList fullview />
          </RootContainer>
        </Grid>
      </Grid>
    </Box>
  )
}
