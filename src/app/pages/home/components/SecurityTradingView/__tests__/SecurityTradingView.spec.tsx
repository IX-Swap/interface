import { sampleSecurity } from 'app/pages/home/components/Securities/__tests__/SecurityCard.spec'
import { SecurityTradingView } from 'app/pages/home/components/SecurityTradingView/SecurityTradingView'
import React from 'react'
import { render, cleanup } from 'test-utils'
import * as UseTimeSeriesHook from 'app/pages/home/hooks/useTimeSeries'
import { generateQueryResult } from '__fixtures__/useQuery'

jest.mock('kaktana-react-lightweight-charts', () => jest.fn(() => null))

describe('SecurityTradingView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<SecurityTradingView data={sampleSecurity} />)
  })

  it('renders currentPrice correctly', () => {
    jest
      .spyOn(UseTimeSeriesHook, 'useTimeSeries')
      .mockReturnValue(generateQueryResult({ isLoading: false }))

    const { getByText } = render(<SecurityTradingView data={sampleSecurity} />)

    expect(getByText('$ 81.00')).toBeTruthy()
  })
})
