import { Grid } from '@mui/material'
import { Address } from 'app/pages/identity/types/forms'
import { CountrySelect } from 'components/form/CountrySelect'
import { OptionalLabel } from 'components/form/OptionalLabel'
import { TypedField } from 'components/form/TypedField'
import { privateClassNames } from 'helpers/classnames'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { TextInput } from 'ui/TextInput/TextInput'

export interface AddressFieldsProps {
  rootName?: string
  defaultValue?: Address
  disabledFields?: Array<keyof Address>
}

export const AddressFields = (props: AddressFieldsProps): JSX.Element => {
  const { rootName = 'address', defaultValue, disabledFields = [] } = props
  const { control } = useFormContext<Address>()

  return (
    <Grid container spacing={5} className={privateClassNames()}>
      <Grid item xs={12} md={6}>
        <TypedField
          component={TextInput}
          fullWidth
          control={control}
          rootName={rootName}
          name='line1'
          label='Line 1'
          variant='outlined'
          defaultValue={defaultValue?.line1 ?? ''}
          disabled={disabledFields.includes('line1')}
          placeholder='Line 1'
          hideIcon
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TypedField
          component={TextInput}
          fullWidth
          control={control}
          rootName={rootName}
          name='line2'
          label={<OptionalLabel label='Line 2' />}
          variant='outlined'
          defaultValue={defaultValue?.line2 ?? ''}
          disabled={disabledFields.includes('line2')}
          placeholder='Line 2'
          hideIcon
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TypedField
          fullWidth
          component={TextInput}
          control={control}
          rootName={rootName}
          name='city'
          label='City'
          variant='outlined'
          defaultValue={defaultValue?.city ?? ''}
          disabled={disabledFields.includes('city')}
          placeholder='City'
          hideIcon
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TypedField
          fullWidth
          component={TextInput}
          control={control}
          rootName={rootName}
          name='state'
          label={<OptionalLabel label='State' />}
          variant='outlined'
          defaultValue={defaultValue?.state ?? ''}
          disabled={disabledFields.includes('state')}
          placeholder='State'
          hideIcon
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
          disabled={disabledFields.includes('country')}
          placeholder='Country'
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TypedField
          fullWidth
          component={TextInput}
          control={control}
          rootName={rootName}
          name='postalCode'
          label='Postal Code'
          variant='outlined'
          defaultValue={defaultValue?.postalCode ?? ''}
          disabled={disabledFields.includes('postalCode')}
          placeholder='Postal Code'
          hideIcon
        />
      </Grid>
    </Grid>
  )
}
