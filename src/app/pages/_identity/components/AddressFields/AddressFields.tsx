import React from 'react'
import { Grid, Hidden, TextField } from '@material-ui/core'
import { IdentityAddress } from 'types/identity'
import { TypedField } from 'components/form/TypedField'
import { CountrySelect } from 'components/form/CountrySelect'
import { useFormContext } from 'react-hook-form'
import { privateClassNames } from 'helpers/classnames'

export interface AddressFieldsProps<FormType> {
  rootName?: string
}

export const AddressFields = <FormType,>(
  props: AddressFieldsProps<FormType>
): JSX.Element => {
  const { rootName = 'address' } = props
  const { control } = useFormContext<IdentityAddress>()

  return (
    <Grid container spacing={3} className={privateClassNames()}>
      <Grid item xs={12} sm={6} md={4}>
        <TypedField
          component={TextField}
          control={control}
          rootName={rootName}
          name='line1'
          label='Line 1'
          variant='outlined'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TypedField
          component={TextField}
          control={control}
          rootName={rootName}
          name='line2'
          label='Line 2'
          variant='outlined'
        />
      </Grid>
      <Hidden smDown>
        <Grid item xs={12} sm={6} md={4} />
      </Hidden>
      <Grid item xs={12} sm={6} md={4}>
        <TypedField
          component={TextField}
          control={control}
          rootName={rootName}
          name='city'
          label='City'
          variant='outlined'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TypedField
          component={TextField}
          control={control}
          rootName={rootName}
          name='state'
          label='State'
          variant='outlined'
        />
      </Grid>
      <Hidden smDown>
        <Grid item xs={12} sm={6} md={4} />
      </Hidden>
      <Grid item xs={12} sm={6} md={4}>
        <TypedField
          component={CountrySelect}
          control={control}
          rootName={rootName}
          name='country'
          label='Country'
          variant='outlined'
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TypedField
          component={TextField}
          control={control}
          rootName={rootName}
          name='postalCode'
          label='Postal Code'
          variant='outlined'
        />
      </Grid>
    </Grid>
  )
}
