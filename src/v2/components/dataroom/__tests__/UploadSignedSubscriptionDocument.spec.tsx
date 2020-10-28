/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  UploadSignedSubscriptionDocument,
  UploadSignedSubscriptionDocumentProps
} from 'v2/components/dataroom/UploadSignedSubscriptionDocument'
import { document } from '__fixtures__/identity'
import { Form } from 'v2/components/form/Form'

describe('UploadSignedSubscriptionDocument', () => {
  const props: UploadSignedSubscriptionDocumentProps = {
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
        <UploadSignedSubscriptionDocument {...props} />
      </Form>
    )
  })
})
