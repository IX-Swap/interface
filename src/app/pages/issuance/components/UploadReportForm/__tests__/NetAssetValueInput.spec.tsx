import { NetAssetValueInput } from 'app/pages/issuance/components/UploadReportForm/NetAssetValueInput'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('NetAssetValueInput', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <NetAssetValueInput />
      </Form>
    )
  })
})
