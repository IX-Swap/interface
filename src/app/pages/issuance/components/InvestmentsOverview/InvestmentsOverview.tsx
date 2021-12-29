import React from 'react'
import { Chart } from 'react-google-charts'
import { useTheme } from '@material-ui/core/styles'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'
import { formatAmountValue } from 'helpers/numbers'
import { InsightCard } from 'app/pages/issuance/components/InsightCard'
import { AssetUnderManagement } from 'types/vccDashboard'
import { InvestmentsOverviewSkeleton } from './InvestmentsOverviewSkeleton'
import { NoInvestmentsMessage } from '../NoInvestmentsMessage'

const createCustomHTMLTooltip = (raised: number, target: number) => {
  return (
    '<div style="background-color: #444444; position: absolute; bottom: -16px; right: -20px; min-width: 190px; text-align: center;padding: 6px 0;border-radius: 3px">' +
    '<div style="color: #ffffff; font-size: : 16px;">' +
    'Raised: ' +
    `${formatAmountValue(raised)}` +
    '</div>' +
    '<div style="color: #ffffff; font-size: : 16px;">' +
    'Target: ' +
    `${formatAmountValue(target)}` +
    '</div>' +
    '<div style="width: 0;height: 0;border-left: 7px solid transparent;border-right: 7px solid transparent;border-top: 7px solid #444444;position: absolute; left: calc(50% - 3.5px); bottom: -7px"/>' +
    '</div>'
  )
}

const createEmptyHTMLTooltip = () => {
  return '<div/>'
}

const getChartItem = (
  name: string,
  totalAmount: number,
  amount: number,
  index: number,
  isEmpty?: boolean
) => {
  const totalValue = 100
  const value = (amount / totalAmount) * 100

  return [
    name,
    value,
    getRowColor(index),
    isEmpty !== undefined && isEmpty
      ? createEmptyHTMLTooltip()
      : createCustomHTMLTooltip(amount, totalAmount),
    totalValue - value,
    '#ECECEC',
    isEmpty !== undefined && isEmpty
      ? createEmptyHTMLTooltip()
      : createCustomHTMLTooltip(amount, totalAmount)
  ]
}

const getChartItems = (investments: AssetUnderManagement[] | undefined) => {
  let chartItems: any[] = []

  if (investments !== undefined) {
    chartItems = investments.map((item, i) =>
      getChartItem(item.dsoName, item.totalAmount, item.amount, i)
    )
  }

  if (chartItems.length >= 5) {
    return chartItems.slice(0, 5)
  }

  while (chartItems.length < 5) {
    chartItems.push(getChartItem('', 0, 0, chartItems.length, true))
  }

  return chartItems
}

export const getRowColor = (index: number) => {
  switch (index) {
    case 0:
      return '#FF9703'
    case 1:
      return '#109619'
    case 2:
      return '#990099'
    case 3:
      return '#3266CC'
    case 4:
      return '#03FF59'
    default:
      return '#FF9703'
  }
}

export interface InvestmentsOverviewProps {
  investments: AssetUnderManagement[] | undefined
  isLoading: boolean
}

export const InvestmentsOverview = ({
  investments,
  isLoading
}: InvestmentsOverviewProps) => {
  const theme = useTheme()
  const hasInvestments = investments !== undefined && investments?.length > 0

  if (isLoading) {
    return <InvestmentsOverviewSkeleton />
  }

  const data = [
    [
      'Asset',
      'Raised',
      { role: 'style' },
      { role: 'tooltip', type: 'string', p: { html: true } },
      'Target',
      { role: 'style' },
      { role: 'tooltip', type: 'string', p: { html: true } }
    ],
    ...getChartItems(investments)
  ]

  return (
    <InsightCard>
      <ChartWrapper title={'Investments Overview'}>
        {hasInvestments ? (
          <Chart
            chartType='BarChart'
            loader={<div>Loading Chart</div>}
            data={data}
            height={'100%'}
            width={'100%'}
            options={{
              isStacked: true,
              backgroundColor: 'transparent',
              legend: {
                position: 'none',
                textStyle: {
                  color: theme.palette.getContrastText(
                    theme.palette.backgrounds.default as any
                  ),
                  fontSize: 14,
                  fontName: 'Poppins'
                }
              },
              bar: { groupWidth: 26 },
              enableInteractivity: true,
              chartArea: {
                width: '100%',
                height: '80%',
                left: 0,
                right: 0,
                bottom: 0,
                top: '10%'
              },
              hAxis: {
                gridlines: {
                  color: 'transparent'
                }
              },
              vAxis: {
                textPosition: 'in'
              },
              tooltip: { isHtml: true }
            }}
          />
        ) : (
          <NoInvestmentsMessage message='There is no investment at the moment. Once you receive investments in your deals you will be able to see the chart.' />
        )}
      </ChartWrapper>
    </InsightCard>
  )
}
