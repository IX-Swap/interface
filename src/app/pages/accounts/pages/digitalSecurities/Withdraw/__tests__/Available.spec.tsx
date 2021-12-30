import { Available } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/Available'
import React from 'react'
import { render } from 'test-utils'

describe('Available', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<Available tokenCurrencySymbol='ETH' available={10000} />)
  })
})
