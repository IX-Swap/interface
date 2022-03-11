import React from 'react'
import { Grid, Input } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { TypedField } from 'components/form/TypedField'
import { AssetSelect } from 'components/form/AssetSelect/AssetSelect'
import { BankFormValues } from 'app/pages/accounts/types'
import { privateClassNames } from 'helpers/classnames'

export const BankFields = () => {
  const { control } = useFormContext<BankFormValues>()

  return (
    <>
      <Grid item container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TypedField
            control={control}
            component={Input}
            name='bankName'
            label='Bank Name'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TypedField
            control={control}
            component={Input}
            name='accountHolderName'
            label='Account Holder Name'
          />
        </Grid>
      </Grid>

      <Grid item container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <TypedField
            control={control}
            component={AssetSelect}
            name='asset'
            label='Currency'
            assetType='Currency'
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TypedField
            className={privateClassNames()}
            control={control}
            component={Input}
            name='bankAccountNumber'
            label='Bank Account Number'
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
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
