import React from 'react'
import { render, cleanup } from 'test-utils'
import { CurrencyFilter } from 'app/pages/admin/components/AssignedVirtualAccountsTable/CurrencyFilter'

describe('CurrencyFilter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CurrencyFilter currency='SGD' />)
  })
})
