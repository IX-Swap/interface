import React from 'react'
import { Chart } from 'react-google-charts'
import { useTheme } from '@material-ui/core/styles'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'
import { InsightCard } from 'app/pages/issuance/components/CapTable/InsightCard'
import { formatDecimal } from 'helpers/numbers'
import { Grid, Typography } from '@material-ui/core'
import { useStyles } from './MarketPortfolio.styles'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { VSpacer } from 'components/VSpacer'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { MarketInfo } from 'types/portfolio'
import { NoMarketInfo } from 'app/pages/accounts/pages/dashboard/components/NoMarketInfo/NoMarketInfo'
import { TotalInvestmentInfo } from 'app/pages/accounts/pages/dashboard/components/TotalInvestmentInfo/TotalInvestmentInfoProps'

export interface MarketPortfolioProps {
  currencySymbol: string
  type: 'primary' | 'secondary'
  marketInfo: MarketInfo | undefined
}

export const MarketPortfolio = ({
  type,
  marketInfo,
  currencySymbol
}: MarketPortfolioProps) => {
  const theme = useTheme()
  const classes = useStyles()
  const { isTablet } = useAppBreakpoints()

  const equityAmount = marketInfo?.equityAmount ?? 0
  const debtAmount = marketInfo?.debtAmount ?? 0
  const fundAmount = marketInfo?.fundAmount ?? 0
  const hybridAmount = marketInfo?.hybridAmount ?? 0
  const totalAmount = marketInfo?.totalAmount ?? 0

  const hasMarketInfo = totalAmount !== 0

  const title =
    type === 'primary'
      ? 'Primary Market Portfolio'
      : 'Secondary Market Portfolio'

  const chartData = [
    ['Markets', 'Fund Status'],
    [`Fund (${formatDecimal(fundAmount)})`, fundAmount],
    [`Debt (${formatDecimal(debtAmount)})`, debtAmount],
    [`Equity (${formatDecimal(equityAmount)})`, equityAmount],
    [`Hybrid (${formatDecimal(hybridAmount)})`, hybridAmount]
  ]

  const amount = fundAmount + debtAmount + equityAmount + hybridAmount

  if (amount < totalAmount) {
    chartData.push([
      `Others (${formatDecimal(totalAmount - amount)})`,
      totalAmount - amount
    ])
  }

  const renderChart = () => (
    <Grid item xs={isTablet ? 12 : 9} className={classes.chartWrapper}>
      <ChartWrapper>
        <Chart
          chartType='PieChart'
          loader={<LoadingIndicator />}
          data={chartData}
          height={312}
          width={'100%'}
          options={{
            pieHole: 0.5,
            colors: [
              '#3266CC',
              '#DC3812',
              '#FF9703',
              '#990099',
              'rgb(204, 204, 204)'
            ],
            backgroundColor: 'transparent',
            legend: {
              position: 'right',
              alignment: 'center',
              textStyle: {
                color: theme.palette.getContrastText(
                  theme.palette.backgrounds.default as any
                ),
                fontSize: 14,
                fontName: 'Poppins'
              }
            },
            enableInteractivity: false,
            pieStartAngle: -90,
            chartArea: {
              width: '100%',
              height: '100%'
            },
            pieSliceText: 'value + %',
            sliceVisibilityThreshold: 0
          }}
        />
      </ChartWrapper>
    </Grid>
  )

  const renderTotalInvestmentInfoForDesktop = () => {
    if (!hasMarketInfo || isTablet) {
      return null
    }
    return (
      <Grid
        item
        container
        direction={'column'}
        xs={isTablet ? 'auto' : 3}
        alignItems={'flex-end'}
        justify={'center'}
      >
        <TotalInvestmentInfo
          value={totalAmount}
          currencySymbol={currencySymbol}
        />
      </Grid>
    )
  }

  const renderTotalInvestmentInfoNotForDesktop = () => {
    if (!hasMarketInfo || !isTablet) {
      return null
    }
    return (
      <TotalInvestmentInfo
        value={totalAmount}
        currencySymbol={currencySymbol}
      />
    )
  }

  const renderMainContent = () => {
    if (!hasMarketInfo) {
      return <NoMarketInfo />
    }
    return renderChart()
  }

  return (
    <InsightCard>
      <Grid container direction={'column'} className={classes.wrapper}>
        <Grid item>
          <Typography variant={'h6'}>{title}</Typography>
          <VSpacer size={'small'} />
          <VSpacer size={'extraSmall'} />
        </Grid>
        <Grid item container className={classes.contentWrapper}>
          {renderTotalInvestmentInfoForDesktop()}
          {renderMainContent()}
          {renderTotalInvestmentInfoNotForDesktop()}
        </Grid>
      </Grid>
    </InsightCard>
  )
}
