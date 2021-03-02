import React from 'react'
import { TypedField } from 'components/form/TypedField'
import { Grid, TextField } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { PhoneInput } from 'components/form/PhoneInput'
import { plainValueExtractor } from 'helpers/forms'

export interface PersonnelInformationProps {
  fieldId: string
  rootName: string
  index: number
}

export const PersonnelInformation = ({
  fieldId,
  rootName,
  index
}: PersonnelInformationProps) => {
  const { control } = useFormContext()

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TypedField
              key={fieldId}
              component={TextField}
              control={control}
              variant='outlined'
              name={[rootName, index, 'fullName']}
              label='Full Name'
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TypedField
              key={fieldId}
              component={TextField}
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
          <Grid item xs={12} md={4}>
            <TypedField
              key={fieldId}
              component={TextField}
              control={control}
              variant='outlined'
              name={[rootName, index, 'email']}
              label='Email Address'
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TypedField
              key={fieldId}
              component={PhoneInput}
              valueExtractor={plainValueExtractor}
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
