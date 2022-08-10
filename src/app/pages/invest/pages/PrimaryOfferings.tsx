import { Box, Grid } from '@mui/material'
import { BackLink } from 'app/components/BackLink/BackLink'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { DSOTable } from 'app/pages/invest/components/DSOTable/DSOTable'
import React from 'react'
import { RootContainer } from 'ui/RootContainer'
import { InvestRoute } from '../router/config'

export const PrimaryOfferings = () => {
  return (
    <Box width='100%'>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <PageHeader
            title='Primary Offerings'
            endComponent={
              <BackLink to={InvestRoute.overview} title='Back to Overview' />
            }
          />
        </Grid>
        <Grid item xs={12}>
          <RootContainer>
            <DSOTable />
          </RootContainer>
        </Grid>
      </Grid>
    </Box>
  )
}
