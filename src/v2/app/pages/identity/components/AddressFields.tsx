import React from 'react'
import { Grid, Input } from '@material-ui/core'
import { IdentityAddress } from 'v2/types/identity'
import { EditableField } from 'v2/components/form/EditableField'
import { CountrySelect } from 'v2/components/form/CountrySelect'
import { useFormContext } from 'react-hook-form'

export interface AddressFieldsProps<FormType> {
  rootName?: 'address' | 'companyAddress'
}

export const AddressFields = <FormType,>(
  props: AddressFieldsProps<FormType>
): JSX.Element => {
  const { rootName = 'address' } = props
  const { control } = useFormContext<IdentityAddress>()

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <EditableField
          component={Input}
          control={control}
          rootName={rootName}
          name='line1'
          label='Line 1'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          component={Input}
          control={control}
          rootName={rootName}
          name='line2'
          label='Line 2'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          component={Input}
          control={control}
          rootName={rootName}
          name='city'
          label='City'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          component={Input}
          control={control}
          rootName={rootName}
          name='postalCode'
          label='Postal Code'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          component={Input}
          control={control}
          rootName={rootName}
          name='state'
          label='State'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          component={CountrySelect}
          control={control}
          rootName={rootName}
          name='country'
          label='Country'
        />
      </Grid>
    </Grid>
  )
}
