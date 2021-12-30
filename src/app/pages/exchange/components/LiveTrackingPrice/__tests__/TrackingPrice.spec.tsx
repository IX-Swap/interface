import {
  TrackingPrice,
  TrackingPriceProps
} from 'app/pages/exchange/components/LiveTrackingPrice/TrackingPrice'
import React from 'react'
import { render } from 'test-utils'

describe('TrackingPrice', () => {
  const props: TrackingPriceProps = {
    trend: 'up',
    price: 123
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<TrackingPrice {...props} />)
  })
})
