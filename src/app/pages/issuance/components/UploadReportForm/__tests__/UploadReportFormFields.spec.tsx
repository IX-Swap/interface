import { UploadReportFormFields } from 'app/pages/issuance/components/UploadReportForm/UploadReportFormFields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

jest.mock(
  'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/UploadDocumentField',
  () => ({
    UploadDocumentField: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/issuance/components/UploadReportForm/DownloadTemplate',
  () => ({
    DownloadTemplate: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/issuance/components/UploadReportForm/FinancialReportDSOSelect',
  () => ({
    FinancialReportDSOSelect: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/issuance/components/UploadReportForm/ReportDetails',
  () => ({
    ReportDetails: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/issuance/components/UploadReportForm/SaveReportButton',
  () => ({
    SaveReportButton: jest.fn(() => null)
  })
)

describe('UploadReportFormFields', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <UploadReportFormFields />
      </Form>
    )
  })
})
