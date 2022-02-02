import { FinancialReportsTable } from 'app/pages/issuance/components/FinancialReportsTable/FinancialReportsTable'
import React from 'react'
import { render, cleanup } from 'test-utils'

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

describe('FinancialReportsTable', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<FinancialReportsTable />)
  })
})
