import { Grid } from '@mui/material'
import { ValidateOnMount } from 'app/pages/identity/components/ValidateOnMount'
import { Address } from 'app/pages/identity/types/forms'
import { CountrySelect } from 'components/form/CountrySelect'
import { TypedField } from 'components/form/TypedField'
import { privateClassNames } from 'helpers/classnames'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TextInput } from 'ui/TextInput/TextInput'
export interface AddressFieldsProps {
  rootName?: string
  defaultValue?: Address
}

export const AddressFields = (props: AddressFieldsProps): JSX.Element => {
  const { rootName = 'address', defaultValue } = props
  const { control } = useFormContext<Address>()

  return (
    <Grid container spacing={6} className={privateClassNames()}>
      <Grid item xs={12} md={6}>
        <TypedField
          customRenderer
          component={TextInput}
          fullWidth
          control={control}
          rootName={rootName}
          name='line1'
          label='Line 1'
          variant='outlined'
          defaultValue={defaultValue?.line1 ?? ''}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TypedField
          customRenderer
          component={TextInput}
          fullWidth
          control={control}
          rootName={rootName}
          name='line2'
          label='Line 2'
          variant='outlined'
          defaultValue={defaultValue?.line2 ?? ''}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TypedField
          customRenderer
          fullWidth
          component={TextInput}
          control={control}
          rootName={rootName}
          name='city'
          label='City'
          variant='outlined'
          defaultValue={defaultValue?.city ?? ''}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TypedField
          customRenderer
          fullWidth
          component={TextInput}
          control={control}
          rootName={rootName}
          name='state'
          label='State'
          variant='outlined'
          defaultValue={defaultValue?.state ?? ''}
        />
      </Grid>
      <Grid item xs={12} md={6}>
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
      <Grid item xs={12} md={6}>
        <TypedField
          customRenderer
          fullWidth
          component={TextInput}
          control={control}
          rootName={rootName}
          name='postalCode'
          label='Postal Code'
          variant='outlined'
          defaultValue={defaultValue?.postalCode ?? ''}
        />
      </Grid>
      <ValidateOnMount />
    </Grid>
  )
}
