import { ReportDetails } from 'app/pages/issuance/components/UploadReportForm/ReportDetails'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

jest.mock('app/pages/issuance/components/UploadReportForm/LaunchDate', () => ({
  LaunchDate: jest.fn(() => null)
}))

jest.mock(
  'app/pages/issuance/components/UploadReportForm/NetAssetValueInput',
  () => ({
    NetAssetValueInput: jest.fn(() => null)
  })
)

jest.mock(
  'app/pages/issuance/components/UploadReportForm/ReportDateInput',
  () => ({
    ReportDateInput: jest.fn(() => null)
  })
)

describe('ReportDetails', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <ReportDetails />
      </Form>
    )
  })
})
