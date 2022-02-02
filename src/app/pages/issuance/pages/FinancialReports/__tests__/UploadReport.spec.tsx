import { UploadReport } from 'app/pages/issuance/pages/FinancialReports/UploadReport'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('UploadReport', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<UploadReport />)
  })
})
