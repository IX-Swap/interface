import React from 'react'
import { render } from 'test-utils'
import { Transactions } from 'app/pages/accounts/pages/transactions/Transactions'

describe('Transactions', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<Transactions />)
  })
})
