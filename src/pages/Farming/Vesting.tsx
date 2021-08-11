import useTheme from 'hooks/useTheme'
import React, { useState } from 'react'
import { hexToRGBA } from 'utils/themeHelper'
import { VestingWrapper } from './styleds'
import { VestingInfo } from './VestingInfo'
import { VestingTable } from './VestingTable'
import dayjs from 'dayjs'

export enum VestingState {
  CONNECT_WALLET = 'CONNECT_WALLET',
  ZERO_BALANCE = 'ZERO_BALANCE',
  VALID = 'VALID',
}
const DATE_FORMAT = 'MMM'
export const Vesting = () => {
  const theme = useTheme()
  const [vestingState, setVestingState] = useState(VestingState.VALID)
  const dates = [
    '2021-05-10T08:44:32.000Z',
    '2021-06-10T08:44:32.000Z',
    '2021-07-10T08:44:32.000Z',
    '2021-08-10T08:44:32.000Z',
    '2021-09-10T08:44:32.000Z',
    '2021-10-10T08:44:32.000Z',
    '2021-11-10T08:44:32.000Z',
    '2021-12-10T08:44:32.000Z',
  ]
  const getColor = (ctx: any, valueLight: string, valueDark: string) => {
    console.log('skipped', { ctx })
    const currentTime = dayjs()
    return dayjs(dates[ctx.p1.parsed.x]).isAfter(currentTime) ? valueLight : valueDark
  }

  const sampleData = {
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
  const sampleOptions = {
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0,
      },
      line: {
        borderJoinStyle: 'round',
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

  const data = {
    labels: dates.map((date) => dayjs(date).format(DATE_FORMAT).toUpperCase()),
    datasets: [
      {
        label: false,
        lineTension: 0.4,
        data: [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000],
        fill: false,
        stepped: true,
        tension: 0.4,
        borderColor: hexToRGBA(theme.text2, 0.3),
        borderRadius: 10,
        borderWidth: 4,
        borderCapStyle: 'round',
        segment: {
          borderColor: (ctx: any) => getColor(ctx, theme.text2, theme.error),
        },
      },
    ],
  }
  const options = {
    maintainAspectRatio: false,
    elements: {
      line: {
        borderJoinStyle: 'round',
      },
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
    <VestingWrapper>
      <VestingInfo state={vestingState} />
      {vestingState !== VestingState.VALID && <VestingTable data={sampleData} options={sampleOptions} />}
      {vestingState === VestingState.VALID && <VestingTable data={data} options={options} />}
    </VestingWrapper>
  )
}
