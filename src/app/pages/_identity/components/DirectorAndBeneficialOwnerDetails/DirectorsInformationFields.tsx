import { Grid, TextField } from '@material-ui/core'
import { AddressFields } from 'app/pages/_identity/components/AddressFields/AddressFields'
import { FormSectionHeader } from 'app/pages/_identity/components/FormSectionHeader'
import { PhoneInput } from 'components/form/PhoneInput'
import { TypedField } from 'components/form/TypedField'
import { pathToString, plainValueExtractor } from 'helpers/forms'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Personnel } from 'types/identity'

export interface DirectorsInformationFieldsProps {
  rootName: string
  index: number
  fieldId: string
  defaultValue: Personnel
}

export const DirectorsInformationFields = ({
  rootName,
  index,
  fieldId,
  defaultValue
}: DirectorsInformationFieldsProps) => {
  const { control } = useFormContext()

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Grid container direction='column' spacing={3}>
          <Grid item>
            <TypedField
              key={fieldId}
              component={TextField}
              control={control}
              variant='outlined'
              name={[rootName, index, 'fullName']}
              label='Full Name'
              defaultValue={defaultValue?.fullName ?? null}
            />
          </Grid>
          <Grid item>
            <TypedField
              key={fieldId}
              component={PhoneInput}
              control={control}
              valueExtractor={plainValueExtractor}
              name={[rootName, index, 'contactNumber']}
              label='Contact Number'
              customRenderer
              fullWidth
              defaultValue={defaultValue?.contactNumber ?? null}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <Grid container direction='column' spacing={3}>
          <Grid item>
            <TypedField
              key={fieldId}
              component={TextField}
              control={control}
              variant='outlined'
              name={[rootName, index, 'designation']}
              label='Designation'
              fullWidth
              defaultValue={defaultValue?.designation ?? null}
            />
          </Grid>
          <Grid item>
            <TypedField
              key={fieldId}
              component={TextField}
              control={control}
              variant='outlined'
              name={[rootName, index, 'email']}
              label='Email Address'
              fullWidth
              defaultValue={defaultValue?.email ?? null}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <FormSectionHeader variant='subsection' title='Residential Address' />
        <AddressFields
          rootName={pathToString([rootName, index, 'address'])}
          defaultValue={defaultValue?.address ?? null}
        />
      </Grid>
    </Grid>
  )
}
