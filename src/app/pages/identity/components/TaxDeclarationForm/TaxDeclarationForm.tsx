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
    <>
      <FormSectionHeader title='Tax Declaration' />
      <Grid
        data-testid='taxDeclaration'
        container
        direction='column'
        spacing={6}
      >
        <Paper sx={{ borderRadius: 2, p: 5 }}>
          <Grid item>
            <Typography>
              <TaxDeclarationInfoDialog /> to know why we need your tax
              information.
            </Typography>
          </Grid>
        </Paper>
        <Grid item>
          {identityType === 'individual' ? (
            <Paper sx={{ borderRadius: 2, p: 5 }}>
              <TaxResidencyFields />
            </Paper>
          ) : (
            <Paper sx={{ borderRadius: 2, p: 5 }}>
              <TaxResidencyFieldArray />
            </Paper>
          )}
        </Grid>
        {identityType === 'individual' ? (
          <>
            <Grid item>
              <Paper sx={{ borderRadius: 2, p: 5 }}>
                <FormSectionHeader title={'FATCA'} />
                <UsCitizenshipConfirmation />
              </Paper>
            </Grid>
          </>
        ) : null}
      </Grid>
    </>
  )
}
