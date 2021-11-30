import React from 'react'
import { render, cleanup } from 'test-utils'
import { TradeConfirmation } from 'app/pages/accounts/pages/reports/TradeConfirmation'

describe('TradeConfirmation', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('should match snapshot', () => {
    const { container } = render(<TradeConfirmation />)
    expect(container).toMatchSnapshot()
  })
})
