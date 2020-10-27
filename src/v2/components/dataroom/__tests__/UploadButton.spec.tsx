/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  UploadButton,
  UploadButtonProps
} from 'v2/components/dataroom/UploadButton'
import { document } from '__fixtures__/identity'
import { Form } from 'v2/components/form/Form'

describe('UploadButton', () => {
  const props: UploadButtonProps = {
    documentInfo: {},
    value: document,
    handleDelete: jest.fn(),
    handleUpload: jest.fn(),
    name: 'test-name'
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <UploadButton {...props} />
      </Form>
    )
  })
})
