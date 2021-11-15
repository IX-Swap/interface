import React from 'react'
import { Grid, Hidden, TextField } from '@material-ui/core'
import { TypedField } from 'components/form/TypedField'
import { CountrySelect } from 'components/form/CountrySelect'
import { useFormContext } from 'react-hook-form'
import { privateClassNames } from 'helpers/classnames'
import { Address } from 'app/pages/identity/types/forms'

export interface AddressFieldsProps {
  rootName?: string
  defaultValue?: Address
}

export const AddressFields = (props: AddressFieldsProps): JSX.Element => {
  const { rootName = 'address', defaultValue } = props
  const { control } = useFormContext<Address>()

  return (
    <Grid container spacing={3} className={privateClassNames()}>
      <Grid item xs={12} sm={6} md={4}>
        <TypedField
          customRenderer
          component={TextField}
          fullWidth
          control={control}
          rootName={rootName}
          name='line1'
          label='Line 1'
          variant='outlined'
          defaultValue={defaultValue?.line1 ?? ''}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TypedField
          customRenderer
          component={TextField}
          fullWidth
          control={control}
          rootName={rootName}
          name='line2'
          label='Line 2'
          variant='outlined'
          defaultValue={defaultValue?.line2 ?? ''}
        />
      </Grid>
      <Hidden smDown>
        <Grid item xs={12} sm={6} md={4} />
      </Hidden>
      <Grid item xs={12} sm={6} md={4}>
        <TypedField
          customRenderer
          fullWidth
          component={TextField}
          control={control}
          rootName={rootName}
          name='city'
          label='City'
          variant='outlined'
          defaultValue={defaultValue?.city ?? ''}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TypedField
          customRenderer
          fullWidth
          component={TextField}
          control={control}
          rootName={rootName}
          name='state'
          label='State'
          variant='outlined'
          defaultValue={defaultValue?.state ?? ''}
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
          defaultValue={defaultValue?.country ?? ''}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TypedField
          customRenderer
          fullWidth
          component={TextField}
          control={control}
          rootName={rootName}
          name='postalCode'
          label='Postal Code'
          variant='outlined'
          defaultValue={defaultValue?.postalCode ?? ''}
        />
      </Grid>
    </Grid>
  )
}
