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
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export const DSOStatusFields = () => {
  const { control } = useFormContext<DSOFormValues>()
  const { isTablet, theme } = useAppBreakpoints()

  return (
    <Grid item xs={12} md={4}>
      <DSOContainer
        title='Status'
        style={{
          paddingLeft: isTablet ? 0 : theme.spacing(2),
          paddingTop: isTablet ? theme.spacing(2) : 0,
          height: '100%'
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={12}>
            <TypedField
              control={control}
              component={CapitalStructureSelect}
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
    </Grid>
  )
}
