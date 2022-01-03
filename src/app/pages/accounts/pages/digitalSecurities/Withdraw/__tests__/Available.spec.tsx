import { Available } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/Available'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('Available', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Available tokenCurrencySymbol='ETH' available={10000} />)
  })
})
