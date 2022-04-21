import React from 'react'
import { Grid, Typography } from '@mui/material'
import { PersonnelInformationProps } from 'app/pages/identity/components/CorporateInformationForm/AuthorizedPersonnel/PersonnelInformation'
import { ValidateOnMount } from 'app/pages/identity/components/ValidateOnMount'
import { TypedField } from 'components/form/TypedField'
import { FileUpload } from 'ui/FileUpload/FileUpload'
import { useFormContext } from 'react-hook-form'
import { plainValueExtractor } from 'helpers/forms'
import { DataroomFileType } from 'config/dataroom'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'

export const AuthorizationDocuments = ({
  fieldId,
  rootName,
  index,
  defaultValue
}: PersonnelInformationProps) => {
  const { control } = useFormContext()

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
        <TypedField
          customRenderer
          fullWidth
          component={FileUpload}
          name={[rootName, index, 'documents', 'value']}
          label='Upload File'
          control={control}
          valueExtractor={plainValueExtractor}
          accept={DataroomFileType.document}
          documentInfo={{
            type: 'DSO Logo'
          }}
        />
      </Grid>

      <ValidateOnMount />
    </Grid>
  )
}
