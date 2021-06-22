import React from 'react'
import { Grid } from '@material-ui/core'
import { TaxResidencyFields } from 'app/pages/identity/components/TaxDeclarationForm/TaxResidencyFields/TaxResidencyFields'
import { UsCitizenshipConfirmation } from 'app/pages/identity/components/TaxDeclarationForm/UsCitizenshipConfirmation/UsCitizenshipConfirmation'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { TaxResidencyFieldArray } from 'app/pages/identity/components/TaxDeclarationForm/TaxResidencyFields/TaxRecidencyFieldArray'

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
    </>
  )
}
