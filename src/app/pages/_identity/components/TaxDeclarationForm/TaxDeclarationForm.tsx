import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { TaxDeclarationInfoDialog } from 'app/pages/_identity/components/TaxDeclarationForm/TaxDeclarationInfoDialog/TaxDeclarationInfoDialog'
import { TaxResidencyFields } from 'app/pages/_identity/components/TaxDeclarationForm/TaxResidencyFields/TaxResidencyFields'
import { UsCitizenshipConfirmation } from 'app/pages/_identity/components/TaxDeclarationForm/UsCitizenshipConfirmation/UsCitizenshipConfirmation'
import { CorporateTaxResidencyFields } from 'app/pages/_identity/components/TaxDeclarationForm/TaxResidencyFields/CorporateTaxResidencyFields'
import { FormSectionHeader } from 'app/pages/_identity/components/FormSectionHeader'

export interface TaxDeclarationFormProps {
  identityType?: 'individual' | 'corporate'
}
export const TaxDeclarationForm = ({
  identityType = 'individual'
}: TaxDeclarationFormProps) => {
  return (
    <>
      <FormSectionHeader title='Tax Declaration' />
      <Grid container direction='column' spacing={6}>
        <Grid item>
          <Typography>
            <TaxDeclarationInfoDialog /> to know why we need your tax
            information.
          </Typography>
        </Grid>
        <Grid item>
          {identityType === 'individual' ? (
            <TaxResidencyFields />
          ) : (
            <CorporateTaxResidencyFields />
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
    </>
  )
}
