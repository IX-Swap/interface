import React from 'react'
import { Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { TypedField } from 'components/form/TypedField'
import { AssetSelect } from 'components/form/AssetSelect/AssetSelect'
import { BankFormValues } from 'app/pages/accounts/types'
import { privateClassNames } from 'helpers/classnames'
import { TextInput } from 'ui/TextInput/TextInput'

export const BankFields = () => {
  const { control } = useFormContext<BankFormValues>()

  return (
    <>
      <Grid item container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TypedField
            control={control}
            component={TextInput}
            name='bankName'
            label='Bank Name'
            placeholder='Bank Name'
            hideIcon
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TypedField
            control={control}
            component={TextInput}
            name='accountHolderName'
            label='Account Holder Name'
            placeholder='Account Holder Name'
            hideIcon
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
            component={TextInput}
            name='bankAccountNumber'
            label='Bank Account Number'
            placeholder='Bank Account Number'
            hideIcon
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TypedField
            className={privateClassNames()}
            control={control}
            component={TextInput}
            name='swiftCode'
            label='Swift Code'
            placeholder='Swift Code'
            hideIcon
          />
        </Grid>
      </Grid>
    </>
  )
}
