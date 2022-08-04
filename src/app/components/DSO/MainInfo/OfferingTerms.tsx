import { Grid, Paper, Typography } from '@mui/material'
import { Info } from 'app/components/DSO/MainInfo/Info'
import { Expandable } from 'app/components/Expandable/Expandable'
import { getPercentageValue } from 'config/utils'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'

export interface OfferingTermsProps {
  dso: DigitalSecurityOffering
}

export const OfferingTerms = ({ dso }: OfferingTermsProps) => {
  const { isTablet } = useAppBreakpoints()
  const dividendYield =
    dso.dividendYield !== undefined
      ? `${getPercentageValue(dso.dividendYield)}%`
      : undefined
  const interestRate =
    dso.interestRate !== undefined
      ? `${getPercentageValue(dso.interestRate)}%`
      : undefined
  const grossIRR =
    dso.grossIRR !== undefined
      ? `${getPercentageValue(dso.grossIRR)}%`
      : undefined

  const equityMultiple =
    dso.equityMultiple !== undefined
      ? `${getPercentageValue(dso.equityMultiple)}%`
      : undefined

  const investmentPeriod =
    dso.investmentPeriod !== undefined
      ? `${dso.investmentPeriod} ${
          dso.investmentPeriod === 1 ? 'Month' : 'Months'
        }`
      : undefined

  const expandedComponent = () => (
    <>
      <Grid item xs={12}>
        <Info label='Investment Period' value={investmentPeriod} />
      </Grid>
      <Grid item xs={12}>
        <Info label='Dividend Yield' value={dividendYield} />
      </Grid>
      <Grid item xs={12}>
        <Info label='Interest Rate' value={interestRate} />
      </Grid>
      <Grid item xs={12}>
        <Info label='Investment Structure' value={dso.investmentStructure} />
      </Grid>
      <Grid item xs={12}>
        <Info label='Gross IRR' value={grossIRR} />
      </Grid>
      <Grid item xs={12}>
        <Info label='Leverage' value={dso.leverage} />
      </Grid>
      <Grid item xs={12}>
        <Info label='Equity Multiple' value={equityMultiple} />
      </Grid>
      <Grid item xs={12}>
        <Info
          label='Distribution Frequency'
          value={dso.distributionFrequency}
        />
      </Grid>
    </>
  )
  return (
    <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: 2 }}>
      {isTablet ? (
        <Expandable
          noBorders
          spacing={3}
          showArrow
          mainComponent={<Typography variant='h4'>Offering Terms</Typography>}
          expandedComponent={
            <Grid container spacing={3}>
              {expandedComponent()}
            </Grid>
          }
        />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant='h4'>Offering Terms</Typography>
          </Grid>
          {expandedComponent()}
        </Grid>
      )}
    </Paper>
  )
}
