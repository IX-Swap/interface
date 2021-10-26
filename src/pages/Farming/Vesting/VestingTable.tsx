import { CurrencyAmount } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import useIXSCurrency from 'hooks/useIXSCurrency'
import useTheme from 'hooks/useTheme'
import React, { useCallback, useMemo } from 'react'
import { defaults, Line } from 'react-chartjs-2'
import { useDistributeCallback, useTableOptions, useVestingState } from 'state/vesting/hooks'
import { TYPE } from 'theme'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'
import { hexToRGBA } from 'utils/themeHelper'
import { ChartParent, VestingTableTitle, VestingTableWrapper } from '../styleds'
import { VestingStatus } from './Vesting'
dayjs.extend(isSameOrAfter)

defaults.animation = false

const DATE_FORMAT = 'DD.MM'
const sampleData = [
  { x: 1620636272, y: 500 },
  { x: 1623314672, y: 1000 },
  { x: 1625906672, y: 1500 },
  { x: 1628585072, y: 2000 },
  { x: 1631263472, y: 2500 },
  { x: 1633855472, y: 3000 },
  { x: 1636533872, y: 3500 },
  { x: 1639125872, y: 4000 },
]

export const VestingTable = ({ vestingStatus }: { vestingStatus: VestingStatus }) => {
  const distribute = useDistributeCallback()
  const options = useTableOptions()
  const currency = useIXSCurrency()
  const { payouts } = useVestingState()
  const theme = useTheme()

  const getColor = useCallback(
    (ctx: any, valueLight: string, valueDark: string) => {
      if (payouts.length === 0 || !payouts[ctx.p0.parsed.x]) {
        return hexToRGBA(theme.text2, 0.3)
      }
      const currentTime = dayjs().unix()
      return dayjs(payouts[ctx.p0.parsed.x][0]).isSameOrAfter(currentTime) ? valueLight : valueDark
    },
    [payouts, theme]
  )

  const points = useMemo(() => {
    if (vestingStatus !== VestingStatus.VALID || !currency || payouts.length === 0) {
      return sampleData
    }
    return payouts.map((point) => ({
      x: point[0],
      y: Number(formatCurrencyAmount(CurrencyAmount.fromRawAmount(currency, point[1]), 5)),
    }))
  }, [currency, payouts, vestingStatus])

  const data = useMemo(() => {
    return {
      labels: points.map((date) => dayjs.unix(date.x).format(DATE_FORMAT).toUpperCase()),
      datasets: [
        {
          label: false,
          lineTension: 0.4,
          data: points.map((point) => point.y),
          fill: false,
          stepped: true,
          tension: 0.4,
          borderColor: hexToRGBA(theme.text2, 0.3),
          borderRadius: 10,
          borderWidth: 4,
          borderCapStyle: 'round',
          segment: {
            borderColor: (ctx: any) =>
              vestingStatus !== VestingStatus.VALID
                ? hexToRGBA(theme.text2, 0.3)
                : getColor(ctx, theme.text2, theme.error),
          },
        },
      ],
    }
  }, [points, theme, vestingStatus, getColor])
  const chart = useMemo(() => <Line data={data} options={options} redraw={false} />, [data, options])

  return (
    <VestingTableWrapper>
      <VestingTableTitle>
        <TYPE.title6 color={theme.text2} style={{ textTransform: 'uppercase' }} onClick={() => distribute()}>
          <Trans>Progress</Trans>
        </TYPE.title6>
      </VestingTableTitle>
      <ChartParent>{chart}</ChartParent>
    </VestingTableWrapper>
  )
}
