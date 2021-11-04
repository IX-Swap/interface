import React from 'react'
import { Grid } from '@material-ui/core'
import { DigitalSecurityOffering } from 'types/dso'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { LabelledValue } from 'components/LabelledValue'
import { PercentageNumber } from 'app/components/DSO/DSOPreview/PercentageNumber'

export interface DSOTermsViewProps {
  dso: DigitalSecurityOffering
}

export const DSOTermsView = ({ dso }: DSOTermsViewProps) => {
  const isDebt = dso.capitalStructure === 'Debt'
  const isEquity = dso.capitalStructure === 'Equity'

  return (
    <Grid container spacing={2} direction='column'>
      <Grid item>
        <FormSectionHeader title='Offering Terms' />
      </Grid>

      <Grid item>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <LabelledValue
              label='Investment Period'
              value={`${dso.investmentPeriod ?? ''} months`}
            />
          </Grid>

          {!isDebt ? (
            <>
              <Grid item xs={12} md={4}>
                <LabelledValue
                  label='Dividend Yield'
                  value={<PercentageNumber value={dso.dividendYield} />}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <LabelledValue
                  label='Gross IRR (%)'
                  value={<PercentageNumber value={dso.grossIRR} />}
                />
              </Grid>
            </>
          ) : null}

          {!isEquity ? (
            <>
              <Grid item xs={12} md={4}>
                <LabelledValue
                  label='Interest Rate'
                  value={<PercentageNumber value={dso.interestRate} />}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <LabelledValue
                  label='Leverage'
                  value={<PercentageNumber value={dso.leverage} />}
                />
              </Grid>
            </>
          ) : null}
        </Grid>
      </Grid>

      <Grid item>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <LabelledValue
              label='Investment Structure'
              value={dso.investmentStructure}
            />
          </Grid>

          {!isDebt ? (
            <Grid item xs={12} md={4}>
              <LabelledValue
                label='Equity Multiple'
                value={<PercentageNumber value={dso.equityMultiple} />}
              />
            </Grid>
          ) : null}

          <Grid item xs={12} md={4}>
            <LabelledValue
              label='Distribution Frequency'
              value={dso.distributionFrequency}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
