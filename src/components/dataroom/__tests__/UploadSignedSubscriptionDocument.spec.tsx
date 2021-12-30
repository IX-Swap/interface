import React from 'react'
import { render } from 'test-utils'
import {
  UploadSignedSubscriptionDocument,
  UploadSignedSubscriptionDocumentProps
} from 'components/dataroom/UploadSignedSubscriptionDocument'
import { document } from '__fixtures__/identity'
import { Form } from 'components/form/Form'
import { generateMutationResult } from '__fixtures__/useQuery'

describe('UploadSignedSubscriptionDocument', () => {
  const props: UploadSignedSubscriptionDocumentProps = {
    documentInfo: {},
    value: document,
    handleDelete: jest.fn(),
    handleUpload: jest.fn(),
    name: 'test-name',
    deleteState: generateMutationResult({}),
    uploadState: generateMutationResult({})
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(
      <Form>
        <UploadSignedSubscriptionDocument {...props} />
      </Form>
    )
  })
})
