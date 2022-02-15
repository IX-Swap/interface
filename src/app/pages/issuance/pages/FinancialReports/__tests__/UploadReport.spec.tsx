import { UploadReport } from 'app/pages/issuance/pages/FinancialReports/UploadReport'
import React from 'react'
import { render } from 'test-utils'

jest.mock(
  'app/pages/issuance/components/UploadReportForm/UploadReportForm',
  () => ({
    UploadReportForm: jest.fn(() => null)
  })
)

describe('UploadReport', () => {
  it('renders without errors', () => {
    render(<UploadReport />)
  })
})
