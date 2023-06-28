import { Grid } from '@mui/material'
import { DSOMinimumInvestment } from 'app/components/DSO/components/DSOMinimumInvestment'
import { DSOTotalUnits } from 'app/components/DSO/components/DSOTotalUnits'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { MinimumInvesmentField } from 'components/form/MinimumInvestmentField'
import { NumericInput } from 'components/form/NumericInput'
import { TypedField } from 'components/form/TypedField'
import { VSpacer } from 'components/VSpacer'
import { moneyNumberFormat } from 'config/numberFormat'
import { numericValueExtractor } from 'helpers/forms'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'types/dso'
import { AssetSelect } from 'components/form/AssetSelect/AssetSelect'

export const Pricing = () => {
  const { control } = useFormContext<DSOFormValues>()

  return (
    <Grid item>
      <Grid container spacing={2} direction='column'>
        <Grid item>
          <FormSectionHeader
            hasBorderBottom={false}
            title='Pricing'
            variant='h5'
          />
        </Grid>
        <Grid item>
          <Grid container spacing={3} pt={2}>
            <Grid item xs={12} sm={6}>
              <TypedField
                assetType='Currency'
                component={AssetSelect}
                label='Currency'
                name='currency'
                control={control}
                placeHolder='Select Currency'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TypedField
                control={control}
                component={NumericInput}
                label='Unit Price'
                name='pricePerUnit'
                numberFormat={moneyNumberFormat}
                valueExtractor={numericValueExtractor}
                helperText='Offering Base Price'
                isOptional
                optionalText='(Offering Base Price)'
                variant='outlined'
              />
            </Grid>
          </Grid>
          <VSpacer size='small' />
        </Grid>
        <Grid item>
          <Grid container spacing={3} pt={2}>
            <Grid item xs={12} sm={6}>
              <TypedField
                control={control}
                component={NumericInput}
                label='Total Fundraising Amount'
                name='totalFundraisingAmount'
                numberFormat={moneyNumberFormat}
                valueExtractor={numericValueExtractor}
                helperText='Amount to raise'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TypedField
                control={control}
                component={MinimumInvesmentField}
                label='Minimum Investment'
                name='minimumInvestment'
                numberFormat={moneyNumberFormat}
                valueExtractor={numericValueExtractor}
                helperText='Number of Tokens'
                isOptional
                optionalText='(Number of Tokens)'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DSOMinimumInvestment />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={3} pt={2}>
            <Grid item xs={12} sm={6}>
              <DSOTotalUnits />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
