import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { UsCitizenshipConfirmationFields } from 'app/pages/_identity/components/TaxDeclarationForm/UsCitizenshipConfirmation/UsCitizenshipConfirmationFields'
import { FatcaDialog } from 'app/pages/_identity/components/TaxDeclarationForm/FatcaDialog/FatcaDialog'

export const UsCitizenshipConfirmation = () => {
  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <Typography>
          <Box component='span' fontWeight='bold'>
            Declaration of US Citizenship or US Residence for <FatcaDialog />
          </Box>
        </Typography>
      </Grid>
      <Grid item>
        <UsCitizenshipConfirmationFields />
      </Grid>
    </Grid>
  )
}
