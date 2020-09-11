import React from 'react'
import { useIndividualIdentityForm } from 'v2/app/pages/identity/components/IndividualIdentityForm'
import { Grid } from '@material-ui/core'

export interface AddressFieldsProps {
  isEditing: boolean
}

export const Address = (props: AddressFieldsProps): JSX.Element => {
  const { isEditing } = props
  const { EditableField } = useIndividualIdentityForm()

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          name={['address', 'line1']}
          label='Line 1'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          name={['address', 'line2']}
          label='Line 2'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          name={['address', 'city']}
          label='City'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          name={['address', 'postalCode']}
          label='Postal Code'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          name={['address', 'state']}
          label='State'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='CountrySelect'
          isEditing={isEditing}
          name={['address', 'country']}
          label='Country'
        />
      </Grid>
    </Grid>
  )
}
