import React from 'react'
import { Chart } from 'react-google-charts'
import { useTheme } from '@material-ui/core/styles'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'
import { InsightCard } from 'app/pages/issuance/components/CapTable/InsightCard'
import { formatAmount, getValueInPercentage } from 'helpers/numbers'
import { Button, Grid, Typography } from '@material-ui/core'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { InvestRoute } from 'app/pages/invest/router/config'
import { useStyles } from 'app/pages/accounts/pages/dashboard/components/MarketPortfolio/MarketPortfolio.styles'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { VSpacer } from 'components/VSpacer'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { TotalInvestmentInfo } from 'app/pages/accounts/pages/dashboard/components/TotalInvestmentInfo/TotalInvestmentInfo'
import { MarketInfo } from 'app/pages/accounts/hooks/useGetPortfolios'

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

  if (marketInfo === undefined) {
    return null
  }

  const {
    equityAmount,
    debtAmount,
    fundAmount,
    hybridAmount,
    totalAmount
  } = marketInfo

  const hasMarketInfo = totalAmount !== 0
  const title =
    type === 'primary'
      ? 'Primary Market Portfolio'
      : 'Secondary Market Portfolio'

  const chartData = [
    ['Markets', 'Fund Status'],
    [
      `Fund (${formatAmount(fundAmount).split('.')[0]})`,
      getValueInPercentage(totalAmount, fundAmount)
    ],
    [
      `Debt (${formatAmount(debtAmount).split('.')[0]})`,
      getValueInPercentage(totalAmount, debtAmount)
    ],
    [
      `Equity (${formatAmount(equityAmount).split('.')[0]})`,
      getValueInPercentage(totalAmount, equityAmount)
    ],
    [
      `Hybrid (${formatAmount(hybridAmount).split('.')[0]})`,
      getValueInPercentage(totalAmount, hybridAmount)
    ]
  ]

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
            // TODO Need to add color gor Hybrid value
            colors: ['#3266CC', '#DC3812', '#FF9703'],
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
            pieSliceText: 'value + %'
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

  const renderNoMarketInfo = () => {
    return (
      <Grid
        container
        direction={'column'}
        alignItems={'center'}
        justify={'center'}
      >
        <VSpacer size={'small'} />
        <Grid item>
          <Typography variant={'subtitle2'}>
            You haven’t made any investments yet. Let’s make the first
            investment.
          </Typography>
        </Grid>
        <VSpacer size={'small'} />
        <VSpacer size={'extraSmall'} />
        <Grid item>
          <Button
            component={AppRouterLinkComponent}
            to={InvestRoute.landing}
            variant='contained'
            color='primary'
            disableElevation
          >
            primary market
          </Button>
        </Grid>
        <VSpacer size={'medium'} />
      </Grid>
    )
  }

  const renderMainContent = () => {
    if (!hasMarketInfo) {
      return renderNoMarketInfo()
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
