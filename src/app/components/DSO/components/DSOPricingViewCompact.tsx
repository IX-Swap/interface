import React from 'react'
import { Grid, Typography } from '@mui/material'
import { DigitalSecurityOffering } from 'types/dso'
import { addSymbol, formatMoney } from 'helpers/numbers'
import { LabelledValue } from 'components/LabelledValue'
import { VSpacer } from 'components/VSpacer'
import useStyles from 'app/components/DSO/components/styles'

export interface DSOPricingViewCompactProps {
  dso: DigitalSecurityOffering
}

export const DSOPricingViewCompact = ({ dso }: DSOPricingViewCompactProps) => {
  const classes = useStyles()
  const currency = dso.currency.symbol
  const totalFundraisingAmount =
    dso.totalFundraisingAmount !== null
      ? addSymbol(dso.totalFundraisingAmount, currency, true)
      : ''
  const minimumInvestment =
    dso.minimumInvestment !== null
      ? addSymbol(dso.minimumInvestment, dso.tokenSymbol, true)
      : ''
  const totalUnits =
    dso.totalFundraisingAmount !== null
      ? (dso.totalFundraisingAmount / dso.pricePerUnit).toLocaleString()
      : 0
  const minimumInvestmentPrice =
    dso.minimumInvestment !== null
      ? addSymbol(dso.minimumInvestment * dso.pricePerUnit, currency, true)
      : 0

  return (
    <Grid
      container
      direction='column'
      spacing={3}
      className={classes.newDSOViewItemStyles}
    >
      <Grid item>
        <Typography
          variant={'h4'}
          color={'primary'}
          style={{ fontWeight: 700 }}
        >
          Pricing
        </Typography>
        <VSpacer size={'small'} />
      </Grid>

      <Grid container item>
        <Grid item xs={12} md={4}>
          <LabelledValue
            label='Unit Price'
            value={formatMoney(dso.pricePerUnit, currency, true)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <LabelledValue
            label='Total Fundraising Amount'
            value={totalFundraisingAmount}
          />
        </Grid>
      </Grid>

      <Grid container item>
        <Grid item xs={12} md={4}>
          <LabelledValue label='Total Units' value={totalUnits} />
        </Grid>

        <Grid item xs={12} md={4}>
          <LabelledValue label='Minimum Investment' value={minimumInvestment} />
        </Grid>
      </Grid>

      <Grid container item>
        <Grid item xs={12} md={4}>
          <LabelledValue
            label='Minimum Investment'
            value={minimumInvestmentPrice}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
