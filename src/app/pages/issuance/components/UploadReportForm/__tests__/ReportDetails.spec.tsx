import { ReportDetails } from 'app/pages/issuance/components/UploadReportForm/ReportDetails'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

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
