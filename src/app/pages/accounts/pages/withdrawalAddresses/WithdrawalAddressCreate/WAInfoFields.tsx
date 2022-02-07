import React from 'react'
import { Grid, TextField } from '@mui/material'
import { BigCheckboxWithLabel } from 'components/form/BigCheckboxWithLabel/BigCheckboxWithLabel'
import { TypedField } from 'components/form/TypedField'
import { privateClassNames } from 'helpers/classnames'
import { booleanValueExtractor } from 'helpers/forms'
import { useFormContext } from 'react-hook-form'
import { WithdrawalAddressFormValues } from 'types/withdrawalAddress'

export const WAInfoFields = () => {
  const { control } = useFormContext<WithdrawalAddressFormValues>()

  return (
    <>
      <Grid item>
        <TypedField
          className={privateClassNames()}
          control={control}
          component={TextField}
          name='label'
          label='Address Label'
          variant='outlined'
        />
      </Grid>

      <Grid item>
        <TypedField
          className={privateClassNames()}
          control={control}
          component={TextField}
          name='memo'
          label='Memo'
          variant='outlined'
        />
      </Grid>

      <Grid item>
        <TypedField
          customRenderer
          valueExtractor={booleanValueExtractor}
          component={BigCheckboxWithLabel}
          control={control}
          name='agree'
          label='I understand and agree that InvestaX will check this address against fraudulent activities.'
        />
      </Grid>
    </>
  )
}
