import { ExchangeRulesLink } from 'app/pages/exchange/components/ExchangeRulesLink/ExchangeRulesLink'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('ExchangeRulesLink', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<ExchangeRulesLink />)
  })
})
