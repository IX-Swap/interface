import React from 'react'
import { render, cleanup } from 'test-utils'
import { ChartContainerProps } from 'types/tvChart'
import { TVChartContainer } from 'app/pages/invest/components/TVChartContainer/TVChartContainer'
import { datafeed } from '__fixtures__/tvChart'

describe('TVChartContainer', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    const props: Partial<ChartContainerProps> = {
      tvWidget: null,
      setTradingChart: jest.fn(),
      datafeed: datafeed
    }

    render(<TVChartContainer {...props} />)
  })
})
