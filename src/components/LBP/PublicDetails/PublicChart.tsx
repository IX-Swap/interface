import { useCallback, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, DefaultTooltipContent } from 'recharts'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { useSubgraphQuery } from 'hooks/useSubgraphQuery'
import { unixTimeToFormat } from 'utils/time'
import { getPrice, getDecayAtStep } from '../utils/calculation'

const composeHistoricalPriceQuery = (lbpAddress: string) => {
  return `
    {
      trades(where:{ pool_:{ id:"${lbpAddress}"}}, orderBy: blockTimestamp, orderDirection: asc) {
        blockTimestamp
        usdPrice
      }
    }
  `
}

interface DetailsChartProps {
  contractAddress?: string
  currentShareReserve?: string
  currentAssetReserve?: string
  startDate?: string
  endDate?: string
  startWeight?: number
  endWeight?: number
  shareAmount?: number
  assetAmount?: number
  chartWidth?: number
}

const DATA_POINT_COUNT = 100
const PRICE_PRECISION = 4

const CustomTooltip: React.FC<{ active?: boolean; payload?: any }> = (props) => {
  if (props.payload[0] != null) {
    // mutating props directly is against react's conventions
    // so we create a new payload with the name and value fields set to what we want
    const newPayload = [
      ...props.payload,
      {
        name: 'time',
        // all your data which created the tooltip is located in the .payload property
        value: props.payload[0].payload.dateWithTime,
        // you can also add "unit" here if you need it
      },
    ]

    // we render the default, but with our overridden payload
    return <DefaultTooltipContent {...props} payload={newPayload} />
  }

  // we just render the default
  return <DefaultTooltipContent {...props} />
}

export default function DetailsChart({
  contractAddress,
  startDate,
  endDate,
  startWeight,
  endWeight,
  shareAmount,
  assetAmount,
  currentShareReserve,
  currentAssetReserve,
  chartWidth,
}: DetailsChartProps) {
  const { chainId } = useWeb3React()
  const subgraphData = useSubgraphQuery({
    feature: 'LBP',
    chainId,
    query: composeHistoricalPriceQuery(contractAddress?.toLowerCase() || ''),
    pollingInterval: 20000,
    autoPolling: true,
  })

  // bucket size is the duration between two data points in milliseconds
  const bucketSize = useMemo(() => {
    if (!startDate || !endDate) return 0
    const start: any = new Date(startDate || '')
    const end: any = new Date(endDate || '')
    // Calculate the difference in milliseconds
    const differenceInMs = end - start
    const bucketSize = differenceInMs / DATA_POINT_COUNT
    return bucketSize
  }, [startDate, endDate])

  const progressPercentage = useMemo(() => {
    const start: any = new Date(startDate || '')
    const end: any = new Date(endDate || '')
    const currentTime: any = new Date()
    // Calculate total duration in milliseconds
    const totalDuration = end - start
    // Calculate elapsed duration from start to last trade time in milliseconds
    const elapsedDuration = currentTime - start
    const progressPercentage = (elapsedDuration / totalDuration) * 100
    return progressPercentage
  }, [startDate, endDate])

  // get bucket index for a given timestamp
  const getBucketIndex = useCallback(
    (timestamp: any) => {
      if (!bucketSize || !startDate) return -1

      const start: any = new Date(startDate || '')
      const differenceFromStart = timestamp - start
      const bucketIndex = Math.floor(differenceFromStart / bucketSize)
      return bucketIndex
    },
    [startDate, bucketSize]
  )

  const dataPoints = useMemo(() => {
    if (
      !startWeight ||
      !endWeight ||
      !shareAmount ||
      !assetAmount ||
      !currentAssetReserve ||
      !currentShareReserve ||
      !bucketSize ||
      !startDate
    )
      return []

    const trades = subgraphData?.trades || []
    const lastTrade = trades.length ? trades[trades.length - 1] : null
    const lastTradeTimestamp = lastTrade ? new Date(Number(lastTrade.blockTimestamp) * 1000) : new Date(0)
    const lastPrice = lastTrade ? lastTrade.usdPrice : 0

    // Group trades by bucket index and find the highest price for each bucket
    const bucketMap = trades.reduce((acc: any, trade: any) => {
      const timestampMs = new Date(Number(trade.blockTimestamp) * 1000).getTime()
      const bucketIndex = getBucketIndex(timestampMs)

      const currentTrade = {
        bucketIndex: bucketIndex,
        blockTimestamp: trade.blockTimestamp,
        date: unixTimeToFormat({ time: trade.blockTimestamp, format: 'MMM DD' }),
        dateWithTime: unixTimeToFormat({ time: trade.blockTimestamp, format: 'MMM DD, HH:mm:ss' }),
        price: parseFloat(trade.usdPrice).toFixed(PRICE_PRECISION),
      }

      // Update bucket if current trade has a higher price
      if (!acc[bucketIndex] || parseFloat(currentTrade.price) > parseFloat(acc[bucketIndex].price)) {
        acc[bucketIndex] = currentTrade
      }

      return acc
    }, {})

    const start: any = new Date(startDate || '')
    const shareStartWeight = startWeight / 100
    const shareEndWeight = endWeight / 100

    const initialPrice = getPrice(shareAmount, shareStartWeight, assetAmount, 1 - shareStartWeight).toFixed(
      PRICE_PRECISION
    )

    bucketMap[-1] = {
      bucketIndex: -1,
      date: unixTimeToFormat({ time: start.getTime() / 1000, format: 'MMM DD' }),
      dateWithTime: unixTimeToFormat({ time: start.getTime() / 1000, format: 'MMM DD, HH:mm:ss' }),
      blockTimestamp: 0,
      price: initialPrice,
    }

    // Fill in missing future buckets
    for (let i = 0; i < DATA_POINT_COUNT; i++) {
      const time = start.getTime() + i * bucketSize
      if (!bucketMap[i] && time > lastTradeTimestamp.getTime()) {
        const decay = getDecayAtStep(shareStartWeight, shareEndWeight, i, DATA_POINT_COUNT)
        const currentShareWeight = shareStartWeight + decay
        const currentAssetWeight = 1 - currentShareWeight

        const price = getPrice(
          parseFloat(currentShareReserve),
          currentShareWeight,
          parseFloat(currentAssetReserve),
          currentAssetWeight
        ).toFixed(PRICE_PRECISION)

        // only show future data points if the future price is less than the last trade price
        if (trades.length && price > lastPrice) {
          continue
        }

        bucketMap[i] = {
          bucketIndex: i,
          date: unixTimeToFormat({ time: time / 1000, format: 'MMM DD' }),
          dateWithTime: unixTimeToFormat({ time: time / 1000, format: 'MMM DD, HH:mm:ss' }),
          blockTimestamp: 0,
          price: price,
        }
      }
    }

    // Convert bucketMap object to array and sort by bucketIndex
    const result = Object.values(bucketMap).sort((a: any, b: any) => a.bucketIndex - b.bucketIndex)
    return result
  }, [
    subgraphData,
    startDate,
    getBucketIndex,
    startWeight,
    endWeight,
    currentShareReserve,
    currentAssetReserve,
    shareAmount,
    assetAmount,
    bucketSize,
  ])

  return (
    <ChartContainer>
      <LineChart
        width={chartWidth ? chartWidth : 800}
        height={400}
        data={dataPoints}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor="#AFAFCD" />
            <stop offset={`${progressPercentage}%`} stopColor="#AFAFCD" />
            <stop offset={`${progressPercentage}%`} stopColor="#6666FF" />
            <stop offset="100%" stopColor="#6666FF" />
          </linearGradient>
        </defs>
        <Tooltip content={<CustomTooltip />} labelFormatter={() => ''} /> {/* Disable default label */}
        <Line type="monotone" dataKey="price" strokeWidth={2} stroke="url(#gradient)" dot={false} />
        <XAxis dataKey="date" axisLine={false} tick={false} />
        <XAxis xAxisId="1" dataKey="date" allowDuplicatedCategory={false} axisLine={false} />
        <YAxis tick={{ fontSize: 14 }} tickFormatter={(value) => `$${value}`} axisLine={false} />
        {/* <ReferenceLine */}
        {/*   x={launchDate} */}
        {/*   label={ */}
        {/*     <g transform="translate(570, 30)"> */}
        {/*       <circle cx={0} cy={0} r={5} fill="#BDBDDB" /> */}
        {/*       <Text fontSize={'14px'} x={10} y={5}> */}
        {/*         Historical Price */}
        {/*       </Text> */}
        {/*     </g> */}
        {/*   } */}
        {/* /> */}
        {/* <ReferenceLine */}
        {/*   x={launchDate} */}
        {/*   y={rand} */}
        {/*   label={ */}
        {/*     <g transform="translate(700, 30)"> */}
        {/*       <circle cx={0} cy={0} r={5} fill="#6666FF" /> */}
        {/*       <Text fontSize={'14px'} x={10} y={5}> */}
        {/*         Future Price */}
        {/*       </Text> */}
        {/*     </g> */}
        {/*   } */}
        {/* /> */}
      </LineChart>
    </ChartContainer>
  )
}

const ChartContainer = styled.div`
  margin-top: 20px;
  border-radius: 8px;
  border: 1px solid #e6e6ff;
  padding: 24px;
  margin-bottom: 30px;
`
