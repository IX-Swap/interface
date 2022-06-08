import React from 'react'
import { Grid, Paper } from '@mui/material'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { TaxResidencyFieldArray } from 'app/pages/identity/components/TaxDeclarationForm/TaxResidencyFields/TaxRecidencyFieldArray'
import { TaxDeclarationInfo } from 'app/pages/identity/components/TaxDeclarationForm/TaxDeclarationInfo/TaxDeclarationInfo'
import useStyles from './TaxDeclarationForm.style'

export interface TaxDeclarationFormProps {
  identityType?: 'individual' | 'corporate'
}
export const TaxDeclarationForm = ({
  identityType = 'individual'
}: TaxDeclarationFormProps) => {
  const classes = useStyles()
  return (
    <Paper className={classes.container}>
      <FormSectionHeader title='Tax Declaration' />
      <Grid data-testid='taxDeclaration' container direction='column'>
        <Grid item className={classes.taxDeclaration}>
          <TaxDeclarationInfo />
        </Grid>
        <Grid item>
          <TaxResidencyFieldArray identityType={identityType} />
        </Grid>
      </Grid>
    </Paper>
  )
}
