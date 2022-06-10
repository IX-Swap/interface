import { Grid } from '@mui/material'
import React from 'react'
import { DirectorsAndBeneficialOwnerFields } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/DirectorsAndBeneficialOwnerFields'

export const DirectorsAndBeneficialOwnerDetails = () => {
  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <DirectorsAndBeneficialOwnerFields name='directors' />
      </Grid>
      <Grid item>
        <DirectorsAndBeneficialOwnerFields name='beneficialOwners' />
      </Grid>
    </Grid>
  )
}
