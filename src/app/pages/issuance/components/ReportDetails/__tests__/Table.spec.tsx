import { Table } from 'app/pages/issuance/components/ReportDetails/Table'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('Table', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Table />)
  })
})
