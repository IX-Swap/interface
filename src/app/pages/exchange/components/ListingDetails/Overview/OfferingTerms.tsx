import { Grid } from '@material-ui/core'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { PercentageNumber } from 'app/components/DSO/DSOPreview/PercentageNumber'
import { LabelledValue } from 'components/LabelledValue'
import React from 'react'

export interface OfferingTermsProps {
  investmentPeriod: number
  dividendYield: number
  investmentStructure: string
  grossIrr: number
  equityMultiple: number
  distributionFrequency: string
  leverage: number
  interestRate: number
  capitalStructure: string
}

export const OfferingTerms = ({
  investmentPeriod,
  dividendYield,
  investmentStructure,
  grossIrr,
  equityMultiple,
  distributionFrequency,
  leverage,
  interestRate,
  capitalStructure
}: OfferingTermsProps) => {
  const isDebt = capitalStructure === 'Debt'
  const isEquity = capitalStructure === 'Equity'

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormSectionHeader title='Offering Terms' />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue
          label='Investment Period'
          value={`${investmentPeriod} months`}
        />
      </Grid>

      {!isDebt ? (
        <>
          <Grid item xs={12} sm={6} md={4}>
            <LabelledValue
              label='Dividend Yield'
              value={<PercentageNumber value={dividendYield} />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <LabelledValue
              label='Gross IRR (%)'
              value={<PercentageNumber value={grossIrr} />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <LabelledValue
              label='Equity Multiple'
              value={<PercentageNumber value={equityMultiple} />}
            />
          </Grid>
        </>
      ) : null}

      {!isEquity ? (
        <>
          <Grid item xs={12} sm={6} md={4}>
            <LabelledValue
              label='Interest Rate'
              value={<PercentageNumber value={interestRate} />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <LabelledValue
              label='Leverage'
              value={<PercentageNumber value={leverage} />}
            />
          </Grid>
        </>
      ) : null}

      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue
          label='Investment Structure'
          value={investmentStructure}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue
          label='Distribution Frequency'
          value={distributionFrequency}
        />
      </Grid>
    </Grid>
  )
}
