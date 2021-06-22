import React from 'react'
import { render, cleanup } from 'test-utils'
import { InvestRoot } from 'app/pages/invest/InvestRoot'

describe('InvestRoot', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<InvestRoot />)
  })
})
