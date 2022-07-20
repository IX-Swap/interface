import { Box, Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { MakeCommitment } from 'app/pages/invest/components/MakeCommitment/MakeCommitment'
import React from 'react'

export const MakeCommitmentPage = () => {
  return (
    <Box width='100%'>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <PageHeader title='Make Commitment' />
        </Grid>
        <Grid item xs={12}>
          <MakeCommitment />
        </Grid>
      </Grid>
    </Box>
  )
}
