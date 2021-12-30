import React from 'react'
import { render } from 'test-utils'
import {
  DataroomFileRow,
  DataroomFileRowProps
} from 'components/dataroom/DataroomFileRow'
import { document } from '__fixtures__/identity'
import { generateMutationResult } from '__fixtures__/useQuery'

describe('DataroomFileRow', () => {
  const props: DataroomFileRowProps = {
    handleUpload: jest.fn(),
    handleDelete: jest.fn(),
    documentInfo: {},
    value: document,
    name: 'test-name',
    uploadState: generateMutationResult({}),
    deleteState: generateMutationResult({})
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<DataroomFileRow {...props} />)
  })
})
