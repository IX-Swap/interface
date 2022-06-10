import { Grid } from '@mui/material'
import React from 'react'
import { DirectorsAndBeneficialOwnerFields } from 'app/pages/identity/components/DirectorAndBeneficialOwnerDetails/DirectorsAndBeneficialOwnerFields'
import { ValidateOnMount } from 'app/pages/identity/components/ValidateOnMount'

export const DirectorsAndBeneficialOwnerDetails = () => {
  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <DirectorsAndBeneficialOwnerFields name='directors' />
      </Grid>
      <Grid item>
        <DirectorsAndBeneficialOwnerFields name='beneficialOwners' />
      </Grid>
      <ValidateOnMount />
    </Grid>
  )
}
