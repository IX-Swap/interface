import { VirtualAccountTabs } from 'app/pages/accounts/components/VirtualAccountCashDeposit/VirtualAccountTabs'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('VirtualAccountTabs', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<VirtualAccountTabs />)
  })
})
