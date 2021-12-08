import React from 'react'
import { Chart } from 'react-google-charts'
import { useTheme } from '@material-ui/core/styles'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'
import { InsightCard } from 'app/pages/issuance/components/CapTable/InsightCard'
import { formatAmountValue } from 'helpers/numbers'

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

export const InvestmntsOverview = () => {
  const theme = useTheme()

  // TODO Add real data after complete backend api endpoint
  const fakeChartData = [
    [
      'Asset',
      'Raised',
      { role: 'style' },
      { role: 'tooltip', type: 'string', p: { html: true } },
      'Target',
      { role: 'style' },
      { role: 'tooltip', type: 'string', p: { html: true } }
    ],
    [
      'IXD SF 1',
      80,
      '#FF9703',
      createCustomHTMLTooltip(80, 20),
      20,
      '#ECECEC',
      createCustomHTMLTooltip(80, 20)
    ],
    [
      'IXD SF 2',
      60,
      '#109619',
      createCustomHTMLTooltip(60, 40),
      40,
      '#ECECEC',
      createCustomHTMLTooltip(60, 40)
    ],
    [
      'IXD SF 3',
      70,
      '#990099',
      createCustomHTMLTooltip(70, 30),
      30,
      '#ECECEC',
      createCustomHTMLTooltip(70, 30)
    ],
    [
      'IXD SF 4',
      40,
      '#3266CC',
      createCustomHTMLTooltip(40, 60),
      60,
      '#ECECEC',
      createCustomHTMLTooltip(40, 60)
    ],
    [
      'IXD SF 5',
      20,
      '#03FF59',
      createCustomHTMLTooltip(20, 80),
      80,
      '#ECECEC',
      createCustomHTMLTooltip(20, 80)
    ]
  ]

  return (
    <InsightCard>
      <ChartWrapper title={'Investments Overview'}>
        <Chart
          chartType='BarChart'
          loader={<div>Loading Chart</div>}
          data={fakeChartData}
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
            bar: { groupWidth: '70%' },
            enableInteractivity: true,
            chartArea: {
              width: '100%',
              height: '80%',
              left: '14%',
              right: 0,
              bottom: 0,
              top: '10%'
            },
            hAxis: {
              gridlines: {
                color: 'transparent'
              }
            },
            tooltip: { isHtml: true }
          }}
        />
      </ChartWrapper>
    </InsightCard>
  )
}
