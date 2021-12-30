import { sampleSecurity } from 'app/pages/educationCentre/components/Securities/__tests__/SecurityCard.spec'
import { SecurityTradingView } from 'app/pages/educationCentre/components/SecurityTradingView/SecurityTradingView'
import React from 'react'
import { render } from 'test-utils'
import * as UseTimeSeriesHook from 'app/pages/educationCentre/hooks/useTimeSeries'
import { generateQueryResult } from '__fixtures__/useQuery'

jest.mock('kaktana-react-lightweight-charts', () => jest.fn(() => null))

describe('SecurityTradingView', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
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
