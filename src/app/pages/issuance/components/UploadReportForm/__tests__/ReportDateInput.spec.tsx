import { ReportDateInput } from 'app/pages/issuance/components/UploadReportForm/ReportDateInput'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('ReportDateInput', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <ReportDateInput />
      </Form>
    )
  })
})
