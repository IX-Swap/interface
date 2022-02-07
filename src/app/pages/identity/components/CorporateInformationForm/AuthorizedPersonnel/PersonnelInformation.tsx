import React from 'react'
import { TypedField } from 'components/form/TypedField'
import { Grid, TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { PhoneInput } from 'components/form/PhoneInput'
import { plainValueExtractor } from 'helpers/forms'
import { Personnel } from 'app/pages/identity/types/forms'

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
          <Grid item xs={12} sm={6} md={4}>
            <TypedField
              key={fieldId}
              defaultValue={defaultValue?.fullName ?? ''}
              component={TextField}
              control={control}
              variant='outlined'
              name={[rootName, index, 'fullName']}
              label='Full Name'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TypedField
              key={fieldId}
              component={TextField}
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
          <Grid item xs={12} sm={6} md={4}>
            <TypedField
              key={fieldId}
              component={TextField}
              defaultValue={defaultValue?.email ?? ''}
              control={control}
              variant='outlined'
              name={[rootName, index, 'email']}
              label='Email Address'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
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
    </Grid>
  )
}
