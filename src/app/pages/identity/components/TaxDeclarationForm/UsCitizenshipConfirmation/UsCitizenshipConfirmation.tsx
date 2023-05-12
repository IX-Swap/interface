import React from 'react'
import { Box, Grid, Typography, Tooltip, Paper } from '@mui/material'
import { UsCitizenshipConfirmationFields } from 'app/pages/identity/components/TaxDeclarationForm/UsCitizenshipConfirmation/UsCitizenshipConfirmationFields'
import { FatcaDialog } from 'app/pages/identity/components/TaxDeclarationForm/FatcaDialog/FatcaDialog'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'
import Info from 'assets/icons/info-tooltip.svg'
import { useStyles } from 'app/pages/identity/components/TaxDeclarationForm/TaxDeclaration.styles'

export const UsCitizenshipConfirmation = () => {
  const styles = useStyles()
  return (
    <>
      <Box display='flex' flexDirection='row' mb={2}>
        <FormSectionHeader title={'FATCA'} />
        &nbsp;
        <Tooltip
          title='Foreign Account Tax Compliance Act'
          arrow
          placement='right'
        >
          <img alt='info' src={Info} />
        </Tooltip>
      </Box>

      <Paper className={styles.container}>
        <Grid item>
          <Typography>Declaration of US Citizenship or US Residence</Typography>
        </Grid>
        <FatcaDialog />
      </Paper>

      <Grid mt={4} container direction='column'>
        <Grid item>
          <UsCitizenshipConfirmationFields />
        </Grid>
      </Grid>
    </>
  )
}
