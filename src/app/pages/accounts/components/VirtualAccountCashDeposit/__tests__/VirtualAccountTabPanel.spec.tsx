import { VirtualAccountTabPanel } from 'app/pages/accounts/components/VirtualAccountCashDeposit/VirtualAccountTabPanel'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('VirtualAccountTabPanel', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<VirtualAccountTabPanel value={0} index={0} />)
  })
})
