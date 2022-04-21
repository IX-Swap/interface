import { Grid } from '@mui/material'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'
import { BusinessOwnerSelect } from 'components/form/BusinessOwnerSelect'
import { TypedField } from 'components/form/TypedField'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TextInput } from 'ui/TextInput/TextInput'

export const OwnershipStructureFields = () => {
  const { control, formState } = useFormContext()

  return (
    <>
      <FormSectionHeader title='Ownership Structure Layers' />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TypedField
            component={BusinessOwnerSelect}
            control={control}
            name='numberOfBusinessOwners'
            label='Number of Business Owners'
            variant='outlined'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TypedField
            component={TextInput}
            fullWidth
            inputProps={{ maxLength: 1024 }}
            control={control}
            name='businessActivity'
            label='Business Activity'
            variant='outlined'
            helperText={
              formState.dirtyFields.businessActivity === true
                ? 'Max 1024 symbols'
                : undefined
            }
          />
        </Grid>
      </Grid>
    </>
  )
}
