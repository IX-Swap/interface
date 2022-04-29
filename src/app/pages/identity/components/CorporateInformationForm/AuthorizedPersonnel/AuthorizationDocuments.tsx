import React from 'react'
import { Grid, Typography } from '@mui/material'
import { PersonnelInformationProps } from 'app/pages/identity/components/CorporateInformationForm/AuthorizedPersonnel/PersonnelInformation'
import { ValidateOnMount } from 'app/pages/identity/components/ValidateOnMount'
import { pathToString } from 'helpers/forms'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { UploadDocumentField } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField'

export const AuthorizationDocuments = ({
  fieldId,
  rootName,
  index,
  defaultValue
}: PersonnelInformationProps) => {
  const fieldName = pathToString([index, 'documents'], rootName)

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FormSectionHeader title='Authorization Document' />
      </Grid>
      <Grid item>
        <Typography variant='caption'>
          Board Resolution, Power of Attorney, Partnership Deed, Trust Deed, and
          Others.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <UploadDocumentField name={fieldName} label='' />
      </Grid>
      <ValidateOnMount />
    </Grid>
  )
}
