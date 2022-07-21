import { Box, Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { BackToDSOButton } from 'app/pages/invest/components/MakeCommitment/BackToDSOButton'
import { MakeCommitment } from 'app/pages/invest/components/MakeCommitment/MakeCommitment'
import React from 'react'

export const MakeCommitmentPage = () => {
  return (
    <Box width='100%'>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <PageHeader
            title='Make Commitment'
            endComponent={<BackToDSOButton />}
          />
        </Grid>
        <Grid item xs={12}>
          <MakeCommitment />
        </Grid>
      </Grid>
    </Box>
  )
}
