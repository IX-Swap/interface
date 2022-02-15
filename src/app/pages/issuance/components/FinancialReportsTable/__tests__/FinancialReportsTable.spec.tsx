import { FinancialReportsTable } from 'app/pages/issuance/components/FinancialReportsTable/FinancialReportsTable'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { TableView } from 'components/TableWithPagination/TableView'

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

describe('FinancialReportsTable', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders correct table and props', () => {
    render(<FinancialReportsTable />)
    expect(TableView).toBeCalledWith(
      expect.objectContaining({
        name: 'financial-reports',
        uri: '/issuance/financial-report-file/list'
      }),
      {}
    )
  })
})
