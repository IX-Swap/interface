import { TimeSeriesChart } from 'app/pages/home/components/Charts/SecurityTimeSeriesChart'
import React from 'react'
import { render, cleanup } from 'test-utils'

jest.mock('kaktana-react-lightweight-charts', () => jest.fn(() => null))

describe('TimeSeriesChart', () => {
  const sampleTimeSeriesData = [
    { time: '2021-07-12', value: 80.01 },
    { time: '2021-07-13', value: 96.63 },
    { time: '2021-07-14', value: 76.64 },
    { time: '2021-07-15', value: 81.89 },
    { time: '2021-07-16', value: 74.43 },
    { time: '2021-07-17', value: 80.01 },
    { time: '2021-07-18', value: 96.63 },
    { time: '2021-07-19', value: 76.64 },
    { time: '2021-07-20', value: 81.89 },
    { time: '2021-07-21', value: 74.43 }
  ]

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<TimeSeriesChart data={sampleTimeSeriesData} range='1W' />)
  })
})
