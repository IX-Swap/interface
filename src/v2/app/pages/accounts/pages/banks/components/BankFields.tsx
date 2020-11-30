import React from 'react'
import { Grid, Input } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { TypedField } from 'v2/components/form/TypedField'
import { AssetSelect } from 'v2/components/form/AssetSelect'
import { BankFormValues } from 'v2/app/pages/accounts/types'
import { privateClassNames } from 'v2/helpers/classnames'

export const BankFields = () => {
  const { control } = useFormContext<BankFormValues>()

  return (
    <>
      <Grid item container spacing={3}>
        <Grid item xs={6}>
          <TypedField
            control={control}
            component={Input}
            name='bankName'
            label='Bank Name'
          />
        </Grid>
        <Grid item xs={6}>
          <TypedField
            control={control}
            component={Input}
            name='accountHolderName'
            label='Account Holder Name'
          />
        </Grid>
      </Grid>

      <Grid item container spacing={3}>
        <Grid item xs={4}>
          <TypedField
            control={control}
            component={AssetSelect}
            name='asset'
            label='Currency'
            assetType='Currency'
          />
        </Grid>
        <Grid item xs={4}>
          <TypedField
            className={privateClassNames()}
            control={control}
            component={Input}
            name='bankAccountNumber'
            label='Bank Account Number'
          />
        </Grid>
        <Grid item xs={4}>
          <TypedField
            className={privateClassNames()}
            control={control}
            component={Input}
            name='swiftCode'
            label='Swift Code'
          />
        </Grid>
      </Grid>
    </>
  )
}
