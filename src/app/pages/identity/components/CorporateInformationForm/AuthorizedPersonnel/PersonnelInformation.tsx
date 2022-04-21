import { Grid } from '@mui/material'
import { ValidateOnMount } from 'app/pages/identity/components/ValidateOnMount'
import { Personnel } from 'app/pages/identity/types/forms'
import { PhoneInput } from 'components/form/PhoneInput'
import { TypedField } from 'components/form/TypedField'
import { plainValueExtractor } from 'helpers/forms'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TextInput } from 'ui/TextInput/TextInput'
export interface PersonnelInformationProps {
  fieldId: string
  rootName: string
  index: number
  defaultValue: Personnel
}

export const PersonnelInformation = ({
  fieldId,
  rootName,
  index,
  defaultValue
}: PersonnelInformationProps) => {
  const { control } = useFormContext()

  return (
    <Grid container direction='column' spacing={5}>
      <Grid item>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TypedField
              key={fieldId}
              defaultValue={defaultValue?.fullName ?? ''}
              component={TextInput}
              control={control}
              variant='outlined'
              name={[rootName, index, 'fullName']}
              label='Full Name'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TypedField
              key={fieldId}
              component={TextInput}
              defaultValue={defaultValue?.designation ?? ''}
              control={control}
              variant='outlined'
              name={[rootName, index, 'designation']}
              label='Designation'
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TypedField
              key={fieldId}
              component={TextInput}
              defaultValue={defaultValue?.email ?? ''}
              control={control}
              variant='outlined'
              name={[rootName, index, 'email']}
              label='Email Address'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TypedField
              key={fieldId}
              component={PhoneInput}
              valueExtractor={plainValueExtractor}
              defaultValue={defaultValue?.contactNumber ?? ''}
              control={control}
              name={[rootName, index, 'contactNumber']}
              label='Contact Number'
              customRenderer
              fullWidth
            />
          </Grid>
        </Grid>
      </Grid>
      <ValidateOnMount />
    </Grid>
  )
}
