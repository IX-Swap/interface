import React from 'react'
import { Grid } from '@material-ui/core'
import { DigitalSecurityOffering } from 'types/dso'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { LabelledValue } from 'components/LabelledValue'
import { PercentageNumber } from 'app/components/DSO/DSOPreview/PercentageNumber'

export interface DSOTermsViewCompactProps {
  dso: DigitalSecurityOffering
}

export const DSOTermsViewCompact = ({ dso }: DSOTermsViewCompactProps) => {
  const isDebt = dso.capitalStructure === 'Debt'
  return (
    <Grid container spacing={2} direction='column'>
      <Grid item>
        <FormSectionHeader title='Offering Terms' />
      </Grid>

      <Grid item container spacing={3}>
        <Grid item xs={12} md={4}>
          <LabelledValue
            label='Investment Period (months)'
            value={dso.investmentPeriod}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <LabelledValue
            label={isDebt ? 'Interest Rate' : 'Dividend Yield (%)'}
            value={
              <PercentageNumber
                value={isDebt ? dso.interestRate : dso.dividendYield}
              />
            }
          />
        </Grid>
      </Grid>

      <Grid item container spacing={3}>
        <Grid item xs={12} md={4}>
          <LabelledValue
            label='Investment Structure'
            value={dso.investmentStructure}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <LabelledValue
            label={isDebt ? 'Leverage' : 'Gross IRR (%)'}
            value={
              <PercentageNumber value={isDebt ? dso.leverage : dso.grossIRR} />
            }
          />
        </Grid>
      </Grid>

      <Grid item container spacing={3}>
        {isDebt ? null : (
          <Grid item xs={12} md={4}>
            <LabelledValue
              label='Equity Multiple (%)'
              value={<PercentageNumber value={dso.equityMultiple} />}
            />
          </Grid>
        )}

        <Grid item xs={12} md={4}>
          <LabelledValue
            label='Distribution Frequency'
            value={dso.distributionFrequency}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
