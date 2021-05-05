import { RadioTabButton } from 'app/pages/accounts/components/VirtualAccountCashDeposit/RadioTabButton'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('RadioTabButton', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<RadioTabButton />)
  })
})
