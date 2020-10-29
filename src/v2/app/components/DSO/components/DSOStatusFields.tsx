import React from 'react'
import { moneyNumberFormat } from 'v2/config/numberFormat'
import { numericValueExtractor } from 'v2/helpers/forms'
import { Grid, Input } from '@material-ui/core'
import { TypedField } from 'v2/components/form/TypedField'
import { CorporateSelect } from 'v2/components/form/CorporateSelect'
import { NumericInput } from 'v2/components/form/NumericInput'
import { DSOContainer } from 'v2/app/components/DSO/components/DSOContainer'
import { useFormContext } from 'react-hook-form'
import { DSOFormValues } from 'v2/types/dso'

export interface DSOStatusFieldsProps {
  isNew: boolean
}

export const DSOStatusFields = (props: DSOStatusFieldsProps) => {
  const { isNew } = props
  const { control } = useFormContext<DSOFormValues>()

  return (
    <DSOContainer title='Status' item xs={4}>
      <Grid container direction='column' spacing={2}>
        {!isNew && (
          <Grid item>
            <TypedField
              control={control}
              component={CorporateSelect}
              label='Corporate'
              name='corporate'
            />
          </Grid>
        )}

        {!isNew && (
          <Grid item>
            <TypedField
              control={control}
              component={Input}
              label='Status'
              name='status'
              inputProps={{
                disabled: true
              }}
            />
          </Grid>
        )}

        <Grid item>
          <TypedField
            control={control}
            component={Input}
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
