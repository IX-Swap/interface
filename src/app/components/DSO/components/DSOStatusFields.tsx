import React from 'react'
import { moneyNumberFormat } from 'config/numberFormat'
import { numericValueExtractor } from 'helpers/forms'
import { Grid, Input } from '@material-ui/core'
import { TypedField } from 'components/form/TypedField'
import { NumericInput } from 'components/form/NumericInput'
import { DSOContainer } from 'app/components/DSO/components/DSOContainer'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'types/dso'

export const DSOStatusFields = () => {
  const { control } = useFormContext<DSOFormValues>()

  return (
    <DSOContainer title='Status' item xs={12} md={4}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={12}>
          <TypedField
            control={control}
            component={Input}
            label='Capital Structure'
            name='capitalStructure'
          />
        </Grid>

        <Grid item xs={12} sm={6} md={12}>
          <TypedField
            control={control}
            component={NumericInput}
            label='Unit Price'
            name='pricePerUnit'
            numberFormat={moneyNumberFormat}
            valueExtractor={numericValueExtractor}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={12}>
          <TypedField
            control={control}
            component={NumericInput}
            label='Total Fundraising Amount'
            name='totalFundraisingAmount'
            numberFormat={moneyNumberFormat}
            valueExtractor={numericValueExtractor}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={12}>
          <TypedField
            control={control}
            component={NumericInput}
            label='Minimum Investment'
            name='minimumInvestment'
            numberFormat={moneyNumberFormat}
            valueExtractor={numericValueExtractor}
          />
        </Grid>
      </Grid>
    </DSOContainer>
  )
}
