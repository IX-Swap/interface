import React from 'react'
import { render } from 'test-utils'
import { ChartContainerProps } from 'types/tvChart'
import { TVChartContainer } from 'app/pages/invest/components/TVChartContainer/TVChartContainer'
import { datafeed } from '__fixtures__/tvChart'

describe('TVChartContainer', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    const props: Partial<ChartContainerProps> = {
      tvWidget: null,
      setTradingChart: jest.fn(),
      datafeed: datafeed
    }

    render(<TVChartContainer {...props} />)
  })
})
