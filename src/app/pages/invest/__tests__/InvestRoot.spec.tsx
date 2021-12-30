import React from 'react'
import { render } from 'test-utils'
import { InvestRoot } from 'app/pages/invest/InvestRoot'

describe('InvestRoot', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<InvestRoot />)
  })
})
