import { TableRow } from 'app/pages/issuance/components/ReportDetails/TableRow'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('TableRow', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<TableRow />)
  })
})
