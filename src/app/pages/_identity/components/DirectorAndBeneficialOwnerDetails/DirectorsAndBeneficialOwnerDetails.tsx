import { Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import { DirectorsAndBeneficialOwnerFields } from 'app/pages/_identity/components/DirectorAndBeneficialOwnerDetails/DirectorsAndBeneficialOwnerFields'
import { useFormContext } from 'react-hook-form'

export const DirectorsAndBeneficialOwnerDetails = () => {
  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <DirectorsAndBeneficialOwnerFields name='directors' />
      </Grid>
      <Grid item>
        <DirectorsAndBeneficialOwnerFields name='beneficialOwners' />
      </Grid>
    </Grid>
  )
}
