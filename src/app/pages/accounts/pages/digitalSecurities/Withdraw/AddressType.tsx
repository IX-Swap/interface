import React from 'react'
import { TypedField } from 'components/form/TypedField'
import { RadioGroup } from 'components/form/RadioGroup'
import { FormControlLabel, Grid, Radio } from '@mui/material'
import { useFormContext } from 'react-hook-form'

export const AddressType = () => {
  const { control, watch } = useFormContext()
  const addressType = watch('addressType', 'new')

  return (
    <TypedField
      component={RadioGroup}
      name='addressType'
      label=''
      control={control}
    >
      <Grid container spacing={3}>
        <Grid item>
          <FormControlLabel
            label='New Address'
            value='new'
            control={<Radio checked={addressType === 'new'} />}
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            label='Import from Withdrawal Addresses'
            value='existing'
            control={<Radio checked={addressType === 'existing'} />}
          />
        </Grid>
      </Grid>
    </TypedField>
  )
}
