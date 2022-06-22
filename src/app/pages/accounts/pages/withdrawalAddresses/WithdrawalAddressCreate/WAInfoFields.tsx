import { Grid } from '@mui/material'
import { BigCheckboxWithLabel } from 'components/form/BigCheckboxWithLabel/BigCheckboxWithLabel'
import { TypedField } from 'components/form/TypedField'
import { privateClassNames } from 'helpers/classnames'
import { booleanValueExtractor } from 'helpers/forms'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { WithdrawalAddressFormValues } from 'types/withdrawalAddress'
import { TextInput } from 'ui/TextInput/TextInput'

export const WAInfoFields = () => {
  const { control } = useFormContext<WithdrawalAddressFormValues>()

  return (
    <>
      <Grid item>
        <TypedField
          className={privateClassNames()}
          control={control}
          component={TextInput}
          name='label'
          label='Address Label'
          variant='outlined'
        />
      </Grid>

      <Grid item>
        <TypedField
          className={privateClassNames()}
          control={control}
          component={TextInput}
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
