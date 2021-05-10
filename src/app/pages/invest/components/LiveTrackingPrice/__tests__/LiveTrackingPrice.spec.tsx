import {
  LiveTrackingPrice,
  LiveTrackingPriceProps
} from 'app/pages/invest/components/LiveTrackingPrice/LiveTrackingPrice'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('LiveTrackingPrice', () => {
  const props: LiveTrackingPriceProps = {
    trend: 'up',
    price: 123
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<LiveTrackingPrice {...props} />)
  })
})
