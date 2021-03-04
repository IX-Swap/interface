import React from 'react'
import { Divider, Grid, Typography } from '@material-ui/core'
import { TaxDeclarationInfoDialog } from 'app/pages/identity/components/TaxDeclarationForm/TaxDeclarationInfoDialog/TaxDeclarationInfoDialog'
import { TaxResidencyFields } from 'app/pages/identity/components/TaxDeclarationForm/TaxResidencyFields/TaxResidencyFields'
import { UsCitizenshipConfirmation } from 'app/pages/identity/components/TaxDeclarationForm/UsCitizenshipConfirmation/UsCitizenshipConfirmation'

export const TaxDeclarationForm = () => {
  return (
    <Grid container direction='column' spacing={6}>
      <Grid item>
        <Typography>
          <TaxDeclarationInfoDialog /> to know why we need your tax information.
        </Typography>
      </Grid>
      <Grid item>
        <TaxResidencyFields />
      </Grid>
      <Grid item>
        <Divider />
      </Grid>
      <Grid item>
        <UsCitizenshipConfirmation />
      </Grid>
    </Grid>
  )
}
