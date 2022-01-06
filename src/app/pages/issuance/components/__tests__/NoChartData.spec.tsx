import React from 'react'
import { render } from 'test-utils'
import { NoChartData } from '../NoChartData'

describe('NoChartData', () => {
  const sampleText = 'No chart data'

  it.skip('renders without any errors', () => {
    render(<NoChartData text={sampleText} />)
  })

  it('renders props correctly', () => {
    const { getByText } = render(<NoChartData text={sampleText} />)
    expect(getByText(sampleText)).toBeTruthy()
  })
})
