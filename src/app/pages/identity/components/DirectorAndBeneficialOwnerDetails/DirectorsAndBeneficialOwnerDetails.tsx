import { Grid, Paper } from '@mui/material'
import React from 'react'
import { DirectorsAndBeneficialOwnerFields } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/DirectorsAndBeneficialOwnerFields'

export const DirectorsAndBeneficialOwnerDetails = () => {
  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Paper sx={{ borderRadius: 2, p: 5 }}>
          <DirectorsAndBeneficialOwnerFields name='directors' />
        </Paper>
      </Grid>
      <Grid item>
        <Paper sx={{ borderRadius: 2, p: 5 }}>
          <DirectorsAndBeneficialOwnerFields name='beneficialOwners' />
        </Paper>
      </Grid>
    </Grid>
  )
}
