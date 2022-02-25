import React from 'react'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { useFormContext } from 'react-hook-form'
import { Grid, TextField } from '@mui/material'
import { TypedField } from 'components/form/TypedField'
import { BusinessOwnerSelect } from 'components/form/BusinessOwnerSelect'

export const OwnershipStructureFields = () => {
  const { control } = useFormContext()

  return (
    <>
      <FormSectionHeader title='Ownership Structure Layers' />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <TypedField
            component={BusinessOwnerSelect}
            control={control}
            name='numberOfBusinessOwners'
            label='Number of Business Owners'
            variant='outlined'
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TypedField
            customRenderer
            component={TextField}
            fullWidth
            control={control}
            name='businessActivity'
            label='Business Activity'
            variant='outlined'
          />
        </Grid>
      </Grid>
    </>
  )
}
