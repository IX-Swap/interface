import { FinancialReportDSOSelect } from 'app/pages/issuance/components/UploadReportForm/FinancialReportDSOSelect'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('FinancialReportDSOSelect', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<FinancialReportDSOSelect />)
  })
})
