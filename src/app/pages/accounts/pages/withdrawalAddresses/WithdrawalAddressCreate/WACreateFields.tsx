import React from 'react'
import { Grid, TextField } from '@material-ui/core'
import { TypedField } from 'components/form/TypedField'
import { privateClassNames } from 'helpers/classnames'
import { useFormContext } from 'react-hook-form'
import { WithdrawalAddressFormValues } from 'types/withdrawalAddress'
import { WAInfoFields } from './WAInfoFields'

export const WACreateFields = () => {
  const { control } = useFormContext<WithdrawalAddressFormValues>()

  return (
    <>
      <Grid item>
        <TypedField
          className={privateClassNames()}
          component={TextField}
          control={control}
          name='address'
          label='Withdrawal Address'
          variant='outlined'
        />
      </Grid>

      <WAInfoFields />
    </>
  )
}
