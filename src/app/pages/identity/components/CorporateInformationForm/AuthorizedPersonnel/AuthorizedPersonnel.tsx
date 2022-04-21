import React from 'react'
import { Grid, Typography } from '@mui/material'
import { PersonnelInformation } from 'app/pages/identity/components/CorporateInformationForm/AuthorizedPersonnel/PersonnelInformation'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { Personnel } from 'app/pages/identity/types/forms'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import { FileUpload } from 'ui/FileUpload/FileUpload'
import { plainValueExtractor } from 'helpers/forms'

export interface AuthorizedPersonnelProps {
  fieldId: string
  rootName: string
  index: number
  append: (value: any) => void
  remove: (index?: number | number[] | undefined) => void
  isLast: boolean
  total: number
  max: number
  defaultValue: Personnel
}

export const AuthorizedPersonnel = (props: AuthorizedPersonnelProps) => {
  const { control } = useFormContext()
  const { rootName, index } = props
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FieldContainer>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormSectionHeader title='Company Authorized Personnel' />
            </Grid>
            <Grid item xs={12}>
              <PersonnelInformation {...props} />
            </Grid>
          </Grid>
        </FieldContainer>
      </Grid>

      <Grid item xs={12}>
        <FieldContainer>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormSectionHeader title='Authorization Document' />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='caption'>
                Board Resolution, Power of Attorney, Partnership Deed, Trust
                Deed, and Others.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TypedField
                fullWidth
                customRenderer
                control={control}
                component={FileUpload}
                label='Upload File'
                placeHolder='Upload File'
                valueExtractor={plainValueExtractor}
                documentInfo={{
                  title: 'Authorization Document',
                  type: 'Authorization Document'
                }}
                name={[rootName, index, 'documents', 0, 'value']}
              />
            </Grid>
          </Grid>
        </FieldContainer>
      </Grid>
    </Grid>
  )
}
