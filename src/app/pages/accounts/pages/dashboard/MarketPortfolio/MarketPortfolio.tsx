import React from 'react'
import { Chart } from 'react-google-charts'
import { useTheme } from '@material-ui/core/styles'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'
import { InsightCard } from 'app/pages/issuance/components/CapTable/InsightCard'
import { formatAmount } from 'helpers/numbers'
import { Box, Grid, Typography } from '@material-ui/core'
import { AppRouterLink } from 'components/AppRouterLink'
import { InvestRoute } from 'app/pages/invest/router/config'
import { Launch } from '@material-ui/icons'
import { useStyles } from './MarketPortfolio.styles'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export interface MarketPortfolioProps {
  type: 'primary' | 'secondary'
  fund: number
  debt: number
  equity: number
  total: number
}

export const MarketPortfolio = ({
  type,
  fund,
  debt,
  equity,
  total
}: MarketPortfolioProps) => {
  const theme = useTheme()
  const { isTablet } = useAppBreakpoints()
  const classes = useStyles()

  if (total === undefined) {
    return null
  }

  const fundInPercent = (100 / total) * fund
  const debtInPercent = (100 / total) * debt
  const equityInPercent = (100 / total) * equity

  const data = [
    ['Markets', 'Fund Status'],
    [`Fund (${formatAmount(fund).split('.')[0]})`, fundInPercent],
    [`Debt (${formatAmount(debt).split('.')[0]})`, debtInPercent],
    [`Equity (${formatAmount(equity).split('.')[0]})`, equityInPercent]
  ]

  const title =
    type === 'primary'
      ? 'Primary Market Portfolio'
      : 'Secondary Market Portfolio'

  const renderTotalInvestmentInfo = () => {
    return (
      <Box
        style={{
          display: isTablet ? 'flex' : 'block',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: isTablet ? '100%' : 'initial',
          marginTop: isTablet ? 40 : 0
        }}
      >
        <Box>
          <Typography
            variant={'body1'}
            style={{ fontSize: 16, fontWeight: 500 }}
          >
            Total Investment:
          </Typography>
          <Typography
            variant={'body1'}
            style={{ fontSize: 16, fontWeight: 500 }}
          >
            S$ 1,000,000.00
          </Typography>
        </Box>
        <Box>
          <AppRouterLink
            to={InvestRoute.landing}
            color='primary'
            underline='hover'
            variant='body1'
            style={{
              display: 'flex',
              alignItems: 'center',
              textTransform: 'uppercase',
              textDecoration: 'none',
              marginTop: isTablet ? 0 : 12
            }}
          >
            <Typography variant={'body1'} style={{ fontWeight: 500 }}>
              View All
            </Typography>
            <Box px={1} />
            <Launch color='disabled' />
          </AppRouterLink>
        </Box>
      </Box>
    )
  }

  return (
    <InsightCard>
      <Grid
        container
        direction={'column'}
        style={{ padding: 24, paddingTop: 16, paddingBottom: 30 }}
      >
        <Grid item>
          <Typography variant={'h6'} style={{ marginBottom: 24 }}>
            {title}
          </Typography>
        </Grid>
        <Grid item container style={{ position: 'relative' }}>
          {!isTablet && (
            <Grid
              item
              container
              direction={'column'}
              xs={isTablet ? 'auto' : 3}
              alignItems={'flex-end'}
              justify={'center'}
            >
              {renderTotalInvestmentInfo()}
            </Grid>
          )}

          <Grid item xs={isTablet ? 12 : 9} className={classes.chartWrapper}>
            <ChartWrapper>
              <Chart
                chartType='PieChart'
                loader={<div>Loading Chart</div>}
                data={data}
                height={312}
                width={'100%'}
                options={{
                  pieHole: 0.5,
                  colors: ['#3266CC', '#DC3812', '#FF9703'],
                  backgroundColor: 'transparent',
                  legend: {
                    position: 'right',
                    alignment: 'center',
                    textStyle: {
                      color: theme.palette.getContrastText(
                        theme.palette.backgrounds.default as any
                      ),
                      fontSize: 12,
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
          {isTablet && renderTotalInvestmentInfo()}
        </Grid>
      </Grid>
    </InsightCard>
  )
}
