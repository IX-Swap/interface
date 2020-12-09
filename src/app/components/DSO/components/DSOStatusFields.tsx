import React from 'react'
import { moneyNumberFormat } from 'config/numberFormat'
import { numericValueExtractor } from 'helpers/forms'
import { Grid } from '@material-ui/core'
import { TypedField } from 'components/form/TypedField'
import { NumericInput } from 'components/form/NumericInput'
import { DSOContainer } from 'app/components/DSO/components/DSOContainer'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'types/dso'
import { CapitalStructureSelect } from 'components/form/CapitalStructureSelect'

export const DSOStatusFields = () => {
  const { control } = useFormContext<DSOFormValues>()

  return (
    <DSOContainer title='Status' item xs={4}>
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <TypedField
            control={control}
            component={CapitalStructureSelect}
            label='Capital Structure'
            name='capitalStructure'
          />
        </Grid>

        <Grid item>
          <TypedField
            control={control}
            component={NumericInput}
            label='Unit Price'
            name='pricePerUnit'
            numberFormat={moneyNumberFormat}
            valueExtractor={numericValueExtractor}
          />
        </Grid>

        <Grid item>
          <TypedField
            control={control}
            component={NumericInput}
            label='Total Fundraising Amount'
            name='totalFundraisingAmount'
            numberFormat={moneyNumberFormat}
            valueExtractor={numericValueExtractor}
          />
        </Grid>

        <Grid item>
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
