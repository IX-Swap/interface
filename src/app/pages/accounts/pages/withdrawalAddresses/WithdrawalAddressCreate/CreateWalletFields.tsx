import React from 'react'
import { Grid, Input } from '@material-ui/core'
import { TypedField } from 'components/form/TypedField'
import { privateClassNames } from 'helpers/classnames'
import { booleanValueExtractor } from 'helpers/forms'
import { BigCheckboxWithLabel } from 'components/form/BigCheckboxWithLabel'
import { useFormContext } from 'react-hook-form'
import { WithdrawalAddressFormValues } from 'types/withdrawalAddress'

export const CreateWalletFields = () => {
  const { control } = useFormContext<WithdrawalAddressFormValues>()

  return (
    <>
      <Grid item>
        <TypedField
          className={privateClassNames()}
          control={control}
          component={Input}
          name='label'
          label='Address Label'
        />
      </Grid>

      <Grid item>
        <TypedField
          className={privateClassNames()}
          control={control}
          component={Input}
          name='memo'
          label='Memo'
        />
      </Grid>

      <Grid item>
        <TypedField
          className={privateClassNames()}
          component={Input}
          control={control}
          name='address'
          label='Withdrawal Address'
        />
      </Grid>

      <Grid item>
        <TypedField
          customRenderer
          valueExtractor={booleanValueExtractor}
          component={BigCheckboxWithLabel}
          control={control}
          name='agree'
          label='I understand and agree that InvestaX will check this address against fradulent activities.'
        />
      </Grid>
    </>
  )
}
