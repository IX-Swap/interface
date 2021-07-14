import {
  DataroomAvatarUploader,
  DataroomAvatarUploaderProps
} from 'components/dataroom/DataroomAvatarUploader'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { document } from '__fixtures__/identity'
import { generateMutationResult } from '__fixtures__/useQuery'

describe('DataroomAvatarUploader', () => {
  const props: DataroomAvatarUploaderProps = {
    name: 'avatar',
    value: document,
    handleUpload: jest.fn(),
    handleDelete: jest.fn(),
    documentInfo: {},
    deleteState: generateMutationResult({}),
    uploadState: generateMutationResult({})
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <DataroomAvatarUploader {...props} />
      </Form>
    )
  })
})
