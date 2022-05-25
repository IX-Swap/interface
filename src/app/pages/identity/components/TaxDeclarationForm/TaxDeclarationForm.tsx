import React from 'react'
import { Grid, Paper, Typography } from '@mui/material'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { TaxResidencyFieldArray } from 'app/pages/identity/components/TaxDeclarationForm/TaxResidencyFields/TaxRecidencyFieldArray'
import { TaxDeclarationInfoDialog } from 'app/pages/identity/components/TaxDeclarationForm/TaxDeclarationInfoDialog/TaxDeclarationInfoDialog'
import { useStyles } from 'app/pages/identity/components/TaxDeclarationForm/TaxDeclaration.styles'

export interface TaxDeclarationFormProps {
  identityType?: 'individual' | 'corporate'
}
export const TaxDeclarationForm = ({
  identityType = 'individual'
}: TaxDeclarationFormProps) => {
  const styles = useStyles()
  return (
    <>
      <FormSectionHeader title='Tax Declaration' />
      <Paper className={styles.container}>
        <Grid item>
          <Typography>Why We Need Your Tax Declaration?</Typography>
        </Grid>
        <TaxDeclarationInfoDialog />
      </Paper>

      <Grid mt={4} data-testid='taxDeclaration' container direction='column'>
        <Grid item>
          {identityType === 'individual' ? (
            <TaxResidencyFieldArray />
          ) : (
            <Paper sx={{ borderRadius: 2, p: 5 }}>
              <TaxResidencyFieldArray />
            </Paper>
          )}
        </Grid>
      </Grid>
    </>
  )
}
