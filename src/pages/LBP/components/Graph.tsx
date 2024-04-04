import React from 'react'
import styled from 'styled-components'
import { Card } from 'rebass'
import { FormCard, StyledStickyBox } from 'pages/KYC/styleds'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

interface GraphProps {
  graphData: any
  step: number
}

const StyledCard = styled(Card)`
  width: 300px;
  height: 400px;
  background: #ffffff;
  margin-top: 200px;
`

export default function Graph({ graphData, step }: GraphProps) {
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
  const generateChartData = (step: number) => {

    //totalHours
    const issuanceDate = new Date(graphData.idIssuanceDate).getTime()
    const expirationDate = new Date(graphData.idExpirationDate).getTime()
    const totalHours = Math.ceil((expirationDate - issuanceDate) / (1000 * 60 * 60)) 
    console.log(totalHours, 'totalHours')


    const numPoints = Math.floor(totalHours / step) + 1
    const chartData = []

    //startWeight endWeight

    const shareStartWeight = 0.9
    const shareEndWeight = 0.3

    //shareInput assetInput

    const shareReserve = graphData?.shareInput
    const assetReserve = graphData?.assetInput

    for (let i = 0; i < numPoints; i++) {
      const decay = getDecayAtStep(shareStartWeight, shareEndWeight, i, numPoints)
      console.info(decay)
      const currentShareWeight = shareStartWeight + decay
      console.info('currentShareWeight', currentShareWeight)
      const currentAssetWeight = 1 - currentShareWeight
      console.info('currentAssetWeight', currentAssetWeight)

      const price = getPrice(shareReserve, currentShareWeight, assetReserve, currentAssetWeight) 
      console.info('price', price)
      chartData.push({ hour: i, price })
    }

    return chartData
  }
  const data = generateChartData(step)
  return (
    <StyledCard>
      <LineChart width={300} height={300} data={data} margin={{ top: 20, right: 30, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#8884d8" horizontal={true} vertical={false} />
        <XAxis dataKey="hour" type="number" label={{ value: 'Hour', position: 'insideBottom', offset: -10 }} axisLine={false} tickLine={false} />
        <YAxis dataKey="price" type="number" label={{ value: 'Price', angle: -90, position: 'insideLeft' }} axisLine={false} tickLine={false} />
        <Tooltip />
        <Legend />
        <Line dataKey="price" stroke="#8884d8" dot={false} />
      </LineChart>
    </StyledCard>
  )
}
