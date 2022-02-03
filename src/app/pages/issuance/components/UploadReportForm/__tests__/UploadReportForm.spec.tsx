import { UploadReportForm } from 'app/pages/issuance/components/UploadReportForm/UploadReportForm'
import React from 'react'
import { render, cleanup } from 'test-utils'

jest.mock(
  'app/pages/issuance/components/UploadReportForm/UploadReportFormFields',
  () => ({
    UploadReportFormFields: jest.fn(() => null)
  })
)

describe('UploadReportForm', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<UploadReportForm />)
  })
})
