import { useCallback, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, ReferenceLine, Tooltip, Text } from 'recharts'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { useSubgraphQuery } from 'hooks/useSubgraphQuery'
import { unixTimeToFormat } from 'utils/time'
import { getPrice, getDecayAtStep } from '../utils/calculation'

interface DataPoint {
  year: number
  value: number
}

const data: DataPoint[] = []
const launchDate = 2004

const rand = 300
for (let i = 0; i < 7; i++) {
  const year = 2000 + i
  const value = Math.random() * (rand + 50) + 100
  let d: DataPoint = {
    year: year,
    value: value,
  }
  data.push(d)
}

console.info('data', data)

const type = 'monotone'

const percentage = 100 - ((7 - 4 - 1) / (7 - 1)) * 100

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
  startDate?: string
  endDate?: string
  startWeight?: number
  endWeight?: number
  shareAmount?: number
  assetAmount?: number
}

const DATA_POINT_COUNT = 100
const PRICE_PRECISION = 4

export default function DetailsChart({
  contractAddress,
  startDate,
  endDate,
  startWeight,
  endWeight,
  shareAmount,
  assetAmount,
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
    if (!startWeight || !endWeight || !shareAmount || !assetAmount || !bucketSize || !startDate) return []

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
        price: parseFloat(trade.usdPrice).toFixed(PRICE_PRECISION),
        isHistorical: true,
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
        const price = getPrice(shareAmount, currentShareWeight, assetAmount, currentAssetWeight).toFixed(
          PRICE_PRECISION
        )

        // only show future data points if the future price is less than the last trade price
        if (trades.length && price > lastPrice) {
          continue
        }

        bucketMap[i] = {
          bucketIndex: i,
          date: unixTimeToFormat({ time: time / 1000, format: 'MMM DD' }),
          blockTimestamp: 0,
          price: price,
          isHistorical: false,
        }
      }
    }

    // Convert bucketMap object to array and sort by bucketIndex
    const result = Object.values(bucketMap).sort((a: any, b: any) => a.bucketIndex - b.bucketIndex)
    return result
  }, [subgraphData, startDate, getBucketIndex, startWeight, endWeight, assetAmount, shareAmount, bucketSize])

  return (
    <ChartContainer>
      <LineChart width={800} height={400} data={dataPoints} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor="#AFAFCD" />
            <stop offset={`${percentage}%`} stopColor="#AFAFCD" />
            <stop offset={`${percentage}%`} stopColor="#6666FF" />
            <stop offset="100%" stopColor="#6666FF" />
          </linearGradient>
        </defs>
        <Tooltip />
        <Line type={type} dataKey="price" strokeWidth={2} stroke="url(#gradient)" dot={false} />
        <XAxis dataKey="date" tick={{ fontSize: 14 }} axisLine={false} />
        <YAxis tick={{ fontSize: 14 }} tickFormatter={(value) => `$${value}`} axisLine={false} />
        <ReferenceLine
          x={launchDate}
          label={
            <g transform="translate(570, 30)">
              <circle cx={0} cy={0} r={5} fill="#BDBDDB" />
              <Text fontSize={'14px'} x={10} y={5}>
                Historical Price
              </Text>
            </g>
          }
        />
        <ReferenceLine
          x={launchDate}
          y={rand}
          label={
            <g transform="translate(700, 30)">
              <circle cx={0} cy={0} r={5} fill="#6666FF" />
              <Text fontSize={'14px'} x={10} y={5}>
                Future Price
              </Text>
            </g>
          }
        />
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
