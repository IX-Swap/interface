import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { DigitalSecurityOffering } from 'types/dso'
import { LabelledValue } from 'components/LabelledValue'
import { PercentageNumber } from 'app/components/DSO/DSOPreview/PercentageNumber'
import { VSpacer } from 'components/VSpacer'
import useStyles from 'app/components/DSO/components/styles'

export interface DSOTermsViewCompactProps {
  dso: DigitalSecurityOffering
}

export const DSOTermsViewCompact = ({ dso }: DSOTermsViewCompactProps) => {
  const classes = useStyles()
  const isDebt = dso.capitalStructure === 'Debt'
  const isEquity = dso.capitalStructure === 'Equity'

  return (
    <Grid
      container
      spacing={2}
      direction='column'
      className={classes.newDSOViewItemStyles}
    >
      <Grid item>
        <Typography
          variant={'h4'}
          color={'primary'}
          style={{ fontWeight: 700 }}
        >
          Offering Terms
        </Typography>
        <VSpacer size={'small'} />
      </Grid>

      <Grid item container spacing={3}>
        <Grid item xs={12} md={4}>
          <LabelledValue
            label='Investment Period'
            value={`${dso.investmentPeriod ?? ''} months`}
          />
        </Grid>

        {!isDebt ? (
          <Grid item xs={12} md={4}>
            <LabelledValue
              label={'Dividend Yield (%)'}
              value={<PercentageNumber value={dso.dividendYield} />}
            />
          </Grid>
        ) : null}

        {!isEquity ? (
          <Grid item xs={12} md={4}>
            <LabelledValue
              label={'Interest Rate'}
              value={<PercentageNumber value={dso.interestRate} />}
            />
          </Grid>
        ) : null}
      </Grid>

      <Grid item container spacing={3}>
        <Grid item xs={12} md={4}>
          <LabelledValue
            label='Investment Structure'
            value={dso.investmentStructure}
          />
        </Grid>

        {!isDebt ? (
          <Grid item xs={12} md={4}>
            <LabelledValue
              label={'Gross IRR (%)'}
              value={<PercentageNumber value={dso.grossIRR} />}
            />
          </Grid>
        ) : null}

        {!isEquity ? (
          <Grid item xs={12} md={4}>
            <LabelledValue
              label={'Leverage'}
              value={<PercentageNumber value={dso.leverage} />}
            />
          </Grid>
        ) : null}
      </Grid>

      <Grid item container spacing={3}>
        {!isDebt ? (
          <Grid item xs={12} md={4}>
            <LabelledValue
              label='Equity Multiple (%)'
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
  )
}
