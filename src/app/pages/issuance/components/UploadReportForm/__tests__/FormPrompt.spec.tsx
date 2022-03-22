import { FormPrompt } from 'app/pages/issuance/components/UploadReportForm/FormPrompt'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('FormPrompt', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <FormPrompt />
      </Form>
    )
  })
})
