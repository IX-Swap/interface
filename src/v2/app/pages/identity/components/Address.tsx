import React from 'react'
import { Grid } from '@material-ui/core'
import { useTypedForm } from 'v2/components/form/useTypedForm'
import { IdentityAddress } from 'v2/types/identity'

export interface AddressFieldsProps<FormType> {
  isEditing: boolean
  rootPath?: 'address' | 'companyAddress'
}

export const Address = <FormType,>(
  props: AddressFieldsProps<FormType>
): JSX.Element => {
  const { isEditing, rootPath = 'address' } = props
  const { EditableField } = useTypedForm<IdentityAddress>()

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          root={rootPath}
          name='line1'
          label='Line 1'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          root={rootPath}
          name='line2'
          label='Line 2'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          root={rootPath}
          name='city'
          label='City'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          root={rootPath}
          name='postalCode'
          label='Postal Code'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          root={rootPath}
          name='state'
          label='State'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='CountrySelect'
          isEditing={isEditing}
          root={rootPath}
          name='country'
          label='Country'
        />
      </Grid>
    </Grid>
  )
}
