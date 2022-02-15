import React from 'react'
import { render } from 'test-utils'
import { FinancialReports } from 'app/pages/issuance/pages/FinancialReports/FinancialReports'

jest.mock(
  'app/pages/issuance/components/FinancialReportsTable/FinancialReportsTable',
  () => ({
    FinancialReportsTable: jest.fn(() => null)
  })
)

jest.mock('app/pages/issuance/components/UploadReportButton', () => ({
  UploadReportButton: jest.fn(() => null)
}))

describe('FinancialReports', () => {
  it('renders without errors', () => {
    render(<FinancialReports />)
  })
})
