import React from 'react'
import { Grid, Hidden } from '@material-ui/core'
import { DigitalSecurityOffering } from 'types/dso'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { LabelledValue } from 'components/LabelledValue'

export interface DSOTermsViewProps {
  dso: DigitalSecurityOffering
}

export const DSOTermsView = ({ dso }: DSOTermsViewProps) => {
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
              value={dso.investmentPeriod}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <LabelledValue label='Dividend Yield' value={dso.dividendYield} />
          </Grid>
          <Grid item xs={12} md={4}>
            <LabelledValue label='Gross IRR (%)' value={dso.grossIRR} />
          </Grid>
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
          <Hidden smDown>
            <Grid item xs={12} md={4} />
          </Hidden>
          <Grid item xs={12} md={4}>
            <LabelledValue
              label='Distribution Frequency'
              value={dso.distributionFrequency}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <LabelledValue label='Equity Multiple' value={dso.equityMultiple} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
