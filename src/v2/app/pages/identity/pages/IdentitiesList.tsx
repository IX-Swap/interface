import React from 'react'
import { Grid } from '@material-ui/core'
import { createTypedForm } from 'v2/components/form/typed/createTypedForm'
import { IndividualIdentityFormValues } from 'v2/app/pages/identity/components/types'
import { IndividualIdPreview } from 'v2/app/pages/identity/pages/individual/IndividualIdPreview'
import { CorporateIdPreview } from 'v2/app/pages/identity/pages/corporate/CorporateIdPreview'

export const useIndividualIdentityForm = createTypedForm<
  IndividualIdentityFormValues
>()

export const IdentitiesList: React.FC = () => {
  return (
    <Grid container direction='column' alignItems='flex-start' spacing={2}>
      <IndividualIdPreview />
      <CorporateIdPreview />
    </Grid>
  )
}
