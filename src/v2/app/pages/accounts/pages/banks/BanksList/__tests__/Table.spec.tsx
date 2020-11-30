import React from 'react'
import { render, cleanup } from 'test-utils'
import { Table } from 'v2/app/pages/accounts/pages/banks/BanksList/Table'

describe('Table', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without error', () => {
    render(<Table />)
  })
})
