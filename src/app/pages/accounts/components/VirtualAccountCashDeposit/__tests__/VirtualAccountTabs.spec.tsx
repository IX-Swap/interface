import { VirtualAccountTabs } from 'app/pages/accounts/components/VirtualAccountCashDeposit/VirtualAccountTabs'
import React from 'react'
import { render } from 'test-utils'

describe('VirtualAccountTabs', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<VirtualAccountTabs />)
  })
})
