import React from 'react'
import { Grid } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { TypedField } from 'components/form/TypedField'
import { AssetSelect } from 'components/form/AssetSelect/AssetSelect'
import { BankFormValues } from 'app/pages/accounts/types'
import { privateClassNames } from 'helpers/classnames'
import { TextInput } from 'ui/TextInput/TextInput'
import { LabelWithTooltip } from 'ui/LabelWithTooltip/LabelWithTooltip'

export const BankFields = () => {
  const { control } = useFormContext<BankFormValues>()

  return (
    <>
      <Grid item container spacing={3}>
        <Grid item xs={12}>
          <TypedField
            control={control}
            component={TextInput}
            name='bankName'
            label={
              <LabelWithTooltip
                label={'Bank Name'}
                tooltipTitle='Special characters like space, comma, full stop and parenthesis are allowed.'
              />
            }
            placeholder='Bank Name'
            hideIcon
          />
        </Grid>
      </Grid>
      <Grid item container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TypedField
            control={control}
            component={TextInput}
            name='accountHolderName'
            label={
              <LabelWithTooltip
                label={'Account Holder Name'}
                tooltipTitle='Maximum 70 characters'
              />
            }
            placeholder='Account Holder Name'
            hideIcon
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TypedField
            className={privateClassNames()}
            control={control}
            component={TextInput}
            name='bankAccountNumber'
            label={
              <LabelWithTooltip
                label={'Bank Account Number'}
                tooltipTitle='No spacing or dashes.'
              />
            }
            placeholder='Bank Account Number'
            hideIcon
          />
        </Grid>
      </Grid>

      <Grid item container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TypedField
            control={control}
            component={AssetSelect}
            name='asset'
            label='Currency'
            placeHolder='Currency'
            assetType='Currency'
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TypedField
            className={privateClassNames()}
            control={control}
            component={TextInput}
            name='swiftCode'
            label={
              <LabelWithTooltip
                label={'SWIFT Code'}
                tooltipTitle={
                  <div>
                    <p style={{ marginTop: 0 }}>
                      All SWIFT codes consist of 8 or 11 characters. An 11 digit
                      code refers to a specific branch, while an 8 digit code
                      refers to the bank's head office. If your SWIFT/BIC code
                      has 8 characters, please input “XXX” at the end.
                    </p>
                    <span>
                      <strong>Example:</strong> UOVBSGSGXXX
                    </span>
                  </div>
                }
              />
            }
            placeholder='SWIFT Code'
            hideIcon
          />
        </Grid>
      </Grid>
    </>
  )
}
