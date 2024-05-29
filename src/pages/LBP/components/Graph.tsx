import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { Card } from 'rebass'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area } from 'recharts'
import { NewLine } from 'components/Line'
import { ReactComponent as DurationIcon } from '../../../assets/images/group3.svg'
import { ReactComponent as MarketCapIcon } from '../../../assets/images/group1.svg'
import { ReactComponent as PriceIcon } from '../../../assets/images/group2.svg'
import { formatNumberWithDecimals } from 'state/lbp/hooks'
import dayjs from 'dayjs'

interface GraphProps {
  graphData: any
  step: number
  setEndPrice: (value: number) => void
  setStartPrice: (value: number) => void
}

const StyledCard = styled(Card)`
  width: 332px;
  height: auto;
  background: #ffffff;
  margin-top: 200px;
  padding-top: 30px;
  padding-bottom: 30px;
`

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 20px;
  margin-left: 22px;
`

const ImageWrapper = styled.div`
  margin-right: 5px;
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const DurationText = styled.span`
  margin-left: 10px;
  margin-top: 10px;
  color: #8f8fb2;
  font-size: 14px;
  font-weight: 500;
`

const DaysText = styled.p`
  margin-top: 5px;
  margin-left: 10px;
  color: #292933e5;
  font-size: 14px;
  font-weight: 500;
`

export default function Graph({ graphData, step, setEndPrice, setStartPrice }: GraphProps) {
  const getPrice = (
    shareReserve: number,
    currentShareWeight: number,
    assetReserve: number,
    currentAssetWeight: number
  ) => {
    return (assetReserve * currentShareWeight) / (shareReserve * currentAssetWeight)
  }
  const getDecayAtStep = (shareStartWeight: number, shareEndWeight: number, step: number, totalStep: number) => {
    return ((shareEndWeight - shareStartWeight) * step) / totalStep
  }
  const generateChartData = useCallback(
    (step: number) => {
      const issuanceDate = new Date(graphData.startDate).getTime()
      const expirationDate = new Date(graphData.endDate).getTime()
      const totalDays = Math.ceil((expirationDate - issuanceDate) / (1000 * 60 * 60 * 24))

      const chartData = []

      const shareStartWeight = graphData.startWeight / 100
      const shareEndWeight = graphData.endWeight / 100

      const shareReserve = graphData?.shareInput
      const assetReserve = graphData?.assetInput

      const oneDay = 24 * 60 * 60 * 1000

      for (let i = 0; i <= totalDays; i += step) {
        const date = new Date(issuanceDate + i * oneDay)
        const decay = getDecayAtStep(shareStartWeight, shareEndWeight, i, totalDays)
        const currentShareWeight = shareStartWeight + decay
        const currentAssetWeight = 1 - currentShareWeight
        const price = getPrice(shareReserve, currentShareWeight, assetReserve, currentAssetWeight)

        const formattedDate = date.getDate() + ' ' + date.toLocaleString('en', { month: 'short' }) + '.'

        chartData.push({ date: formattedDate, price })
      }

      if (chartData.length >= 2) {
        setStartPrice(chartData[0].price)
        setEndPrice(chartData[chartData.length - 1].price)
      }

      return chartData
    },
    [setEndPrice, setStartPrice, graphData]
  )
  const data = generateChartData(step)

  const contentData = useMemo(() => {
    const duration = dayjs(graphData.endDate).diff(dayjs(graphData.startDate), 'day') || 0
    const [maxPrice, minPrice] = data.length >= 2 ? [data[0].price, data[data.length - 1].price] : [0, 0]
    const priceRange = `$${minPrice.toFixed(3)} - $${maxPrice.toFixed(3)}`
    const maxMarketCap = formatNumberWithDecimals(maxPrice * (graphData?.shareInput || 0), 2)
    const minMarketCap = formatNumberWithDecimals(minPrice * (graphData?.shareInput || 0), 2)

    return [
      {
        icon: DurationIcon,
        title: 'Duration',
        description: `${duration} Days`,
      },
      {
        icon: MarketCapIcon,
        title: 'Implied Market Cap',
        description: `$${minMarketCap} — $${maxMarketCap}`,
      },
      {
        icon: PriceIcon,
        title: 'Price Range',
        description: priceRange,
      },
    ]
  }, [data, graphData])

  return (
    <StyledCard>
      <p style={{ fontWeight: '600', fontSize: '20px', marginTop: '20px', marginLeft: '20px' }}>
        Price Discovery Preview
      </p>

      <LineChart width={332} height={332} data={data} margin={{ top: 20, right: 30, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#8884d8" horizontal={false} vertical={false} />
        <XAxis
          dataKey="date"
          label={{ value: '', position: 'insideBottom', offset: -10 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis dataKey="price" axisLine={false} tickLine={false} />
        <Tooltip />
        <Line strokeWidth={2.5} dataKey="price" stroke="#8884d8" dot={false} type="monotone" />
      </LineChart>

      {contentData.map(({ icon: Icon, title, description }, index) => (
        <React.Fragment key={index}>
          <NewLine style={{ margin: '10px 0px' }} />
          <ContentWrapper>
            <ImageWrapper>
              <Icon />
            </ImageWrapper>
            <TextWrapper>
              <DurationText>{title}</DurationText>
              <DaysText>{description}</DaysText>
            </TextWrapper>
          </ContentWrapper>
        </React.Fragment>
      ))}
    </StyledCard>
  )
}
