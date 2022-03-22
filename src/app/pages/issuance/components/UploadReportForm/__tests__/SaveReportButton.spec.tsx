import React from 'react'
import { render, cleanup } from 'test-utils'
import { SaveReportButton } from 'app/pages/issuance/components/UploadReportForm/SaveReportButton'
import { Form } from 'components/form/Form'

describe('SaveReportButton', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <SaveReportButton />
      </Form>
    )
  })
})
