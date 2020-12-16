import React from 'react'
import { render, cleanup } from 'test-utils'
import { InvestLanding } from 'app/pages/invest/pages/InvestLanding'

describe('InvestLanding', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<InvestLanding />)
  })
})
