import React from 'react'
import { render } from 'test-utils'
import { CurrencyFilter } from 'app/pages/admin/components/AssignedVirtualAccountsTable/CurrencyFilter'

describe('CurrencyFilter', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<CurrencyFilter currency='SGD' />)
  })
})
