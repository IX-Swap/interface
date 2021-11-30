import React from 'react'
import { render, cleanup } from 'test-utils'
import { AggregatedCostsAndCharges } from 'app/pages/accounts/pages/reports/AggregatedCostsAndCharges'

describe('AggregatedCostsAndCharges', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('should match snapshot', () => {
    const { container } = render(<AggregatedCostsAndCharges />)
    expect(container).toMatchSnapshot()
  })
})
