import { Tt } from 'app/pages/accounts/components/VirtualAccountCashDeposit/Tt'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('Tt', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Tt />)
  })
})
