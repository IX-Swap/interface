import { Fast } from 'app/pages/accounts/components/VirtualAccountCashDeposit/Fast'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('Fast', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Fast />)
  })
})
