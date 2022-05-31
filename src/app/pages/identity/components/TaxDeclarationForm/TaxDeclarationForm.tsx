import React from 'react'
import { Grid, Paper, Typography } from '@mui/material'
import { TaxResidencyFields } from 'app/pages/identity/components/TaxDeclarationForm/TaxResidencyFields/TaxResidencyFields'
import { UsCitizenshipConfirmation } from 'app/pages/identity/components/TaxDeclarationForm/UsCitizenshipConfirmation/UsCitizenshipConfirmation'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { TaxResidencyFieldArray } from 'app/pages/identity/components/TaxDeclarationForm/TaxResidencyFields/TaxRecidencyFieldArray'
import { TaxDeclarationInfoDialog } from 'app/pages/identity/components/TaxDeclarationForm/TaxDeclarationInfoDialog/TaxDeclarationInfoDialog'

export interface TaxDeclarationFormProps {
  identityType?: 'individual' | 'corporate'
}
export const TaxDeclarationForm = ({
  identityType = 'individual'
}: TaxDeclarationFormProps) => {
  return (
    <Paper sx={{ borderRadius: 2, p: 5 }}>
      <FormSectionHeader title='Tax Declaration' />
      <Grid
        data-testid='taxDeclaration'
        container
        direction='column'
        spacing={6}
      >
        <Grid
          item
          container
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Grid item>
            <Typography>To know why we need your tax declaration</Typography>
          </Grid>
          <Grid item>
            <TaxDeclarationInfoDialog />
          </Grid>
        </Grid>
        <Grid item>
          {identityType === 'individual' ? (
            <TaxResidencyFields />
          ) : (
            <TaxResidencyFieldArray />
          )}
        </Grid>
        {identityType === 'individual' ? (
          <>
            <Grid item>
              <FormSectionHeader title={'FATCA'} />
              <UsCitizenshipConfirmation />
            </Grid>
          </>
        ) : null}
      </Grid>
    </Paper>
  )
}
