import React from 'react'
import { render, cleanup } from 'test-utils'
import { Actions } from 'app/pages/issuance/components/FinancialReportsTable/Actions'
import { sampleFinancialReport } from '__fixtures__/financialReport'
import { DownloadDocument } from 'components/dataroom/DownloadDocument'

jest.mock('components/dataroom/DownloadDocument', () => ({
  DownloadDocument: jest.fn(() => null)
}))
describe('Actions', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Actions item={sampleFinancialReport} />)
  })

  it('renders Download button correctly', () => {
    render(<Actions item={sampleFinancialReport} />)

    expect(DownloadDocument).toHaveBeenCalledWith(
      expect.objectContaining({
        documentId: sampleFinancialReport.documentId
      }),
      {}
    )
  })
})
