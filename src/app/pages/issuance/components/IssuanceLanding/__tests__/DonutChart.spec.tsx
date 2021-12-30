import React from 'react'
import { render } from 'test-utils'
import { DonutChart } from 'app/pages/issuance/components/IssuanceLanding/DonutChart'
import { Chart } from 'react-google-charts'
import Typography from '@material-ui/core/Typography'

jest.mock('react-google-charts', () => ({
  Chart: jest.fn(() => null)
}))

jest.mock('@material-ui/core/Typography', () => jest.fn(() => null))

const defaultDonatChartProps = {
  isNewThemeOn: false,
  percent: 1
}
const donutChartProps = { ...defaultDonatChartProps, isNewThemeOn: true }
const donutChartPropsWithText = { ...defaultDonatChartProps, text: 'text' }

describe('DonutChart', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders Chart with correct props when isNewThemeOn is false', () => {
    render(<DonutChart {...defaultDonatChartProps} />)

    expect(Chart).toHaveBeenCalledTimes(1)
    expect(Chart).toHaveBeenCalledWith(
      expect.objectContaining({
        chartType: 'PieChart',
        options: {
          colors: ['rgb(245,189,37)', 'lightgrey'],
          backgroundColor: 'transparent',
          tooltip: { trigger: 'none' },
          enableInteractivity: false,
          legend: 'none',
          pieHole: 0.75,
          pieStartAngle: 270,
          chartArea: {
            width: 48,
            height: 48
          },
          width: 48,
          height: 48
        }
      }),
      {}
    )
  })

  it('renders Chart with correct props when isNewThemeOn is true', () => {
    render(<DonutChart {...donutChartProps} />)

    expect(Chart).toHaveBeenCalledTimes(1)
    expect(Chart).toHaveBeenCalledWith(
      expect.objectContaining({
        chartType: 'PieChart',
        options: {
          colors: ['#F5BD25', '#EFF0F4'],
          backgroundColor: 'transparent',
          tooltip: { trigger: 'none' },
          enableInteractivity: false,
          legend: 'none',
          pieHole: 0.75,
          pieStartAngle: 270,
          chartArea: {
            width: 58,
            height: 58
          },
          width: 58,
          height: 58
        }
      }),
      {}
    )
  })

  it.skip('renders Typography with correct props when isNewThemeOn is false', () => {
    render(<DonutChart {...defaultDonatChartProps} />)

    expect(Typography).toHaveBeenCalledTimes(1)
    expect(Typography).toHaveBeenCalledWith(
      expect.objectContaining({
        className: 'makeStyles-percent-10',
        children: '1%'
      }),
      {}
    )
  })

  it.skip('renders Typography with correct props when isNewThemeOn is true', () => {
    render(<DonutChart {...donutChartProps} />)

    expect(Typography).toHaveBeenCalledTimes(1)
    expect(Typography).toHaveBeenCalledWith(
      expect.objectContaining({
        className: 'makeStyles-percent-13 makeStyles-percentNew-14',
        children: '1%'
      }),
      {}
    )
  })

  it.skip('renders Typography with correct props when text is not undefined', () => {
    render(<DonutChart {...donutChartPropsWithText} />)

    expect(Typography).toHaveBeenCalledTimes(1)
    expect(Typography).toHaveBeenCalledWith(
      expect.objectContaining({
        className: 'makeStyles-percent-16',
        children: 'text'
      }),
      {}
    )
  })
})
