import React from 'react'
import { render, cleanup } from 'test-utils'
import { Transactions } from 'v2/app/pages/accounts/pages/transactions/Transactions'

describe('Transactions', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Transactions />)
  })
})
