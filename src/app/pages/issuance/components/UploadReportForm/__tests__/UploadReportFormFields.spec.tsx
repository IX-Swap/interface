import { UploadReportFormFields } from 'app/pages/issuance/components/UploadReportForm/UploadReportFormFields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

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
