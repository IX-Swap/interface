import { ViewReport } from 'app/pages/issuance/pages/FinancialReports/ViewReport'
import React from 'react'
import { render, cleanup } from 'test-utils'

jest.mock('app/pages/identity/components/FormSectionHeader', () => ({
  FormSectionHeader: jest.fn(() => null)
}))

jest.mock('app/pages/issuance/components/ReportDetails/ReportDetails', () => ({
  ReportDetails: jest.fn(() => null)
}))

describe('ViewReport', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<ViewReport />)
  })
})
