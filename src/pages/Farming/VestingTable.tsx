import { Trans } from '@lingui/macro'
import useTheme from 'hooks/useTheme'
import React from 'react'
import { Line } from 'react-chartjs-2'
import { TYPE } from 'theme'
import { hexToRGBA } from 'utils/themeHelper'
import { ChartParent, VestingTableTitle, VestingTableWrapper } from './styleds'

export const VestingTable = () => {
  const theme = useTheme()

  const data = {
    labels: ['MAY', 'JUN', 'JULY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    datasets: [
      {
        label: false,
        lineTension: 0.4,
        data: [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000],
        fill: false,
        stepped: true,
        borderColor: hexToRGBA(theme.text2, 0.3),
        borderWidth: 4,
      },
    ],
  }
  const options = {
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: hexToRGBA(theme.text2, 0.5),
        },
      },
      y: {
        grid: {
          color: hexToRGBA(theme.text2, 0.2),
          borderWidth: 0,
          borderDash: [3, 3],
        },
        ticks: {
          color: theme.text2,
          fontWeight: 300,
          fontSize: '14px',
          lineHeight: '21px',
        },
      },
    },
  }

  return (
    <VestingTableWrapper>
      <VestingTableTitle>
        <TYPE.title6 color={theme.text2} style={{ textTransform: 'uppercase' }}>
          <Trans>Progress</Trans>
        </TYPE.title6>
      </VestingTableTitle>
      <ChartParent>
        <Line data={data} options={options} />
      </ChartParent>
    </VestingTableWrapper>
  )
}
