import {
  TrackingPrice,
  TrackingPriceProps
} from 'app/pages/exchange/components/LiveTrackingPrice/TrackingPrice'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('TrackingPrice', () => {
  const props: TrackingPriceProps = {
    trend: 'up',
    price: 123
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<TrackingPrice {...props} />)
  })
})
