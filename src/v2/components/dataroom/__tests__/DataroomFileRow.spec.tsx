/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import {
  DataroomFileRow,
  DataroomFileRowProps
} from 'v2/components/dataroom/DataroomFileRow'
import { document } from '__fixtures__/identity'

describe('DataroomFileRow', () => {
  const props: DataroomFileRowProps = {
    handleUpload: jest.fn(),
    handleDelete: jest.fn(),
    documentInfo: {},
    value: document,
    name: 'test-name'
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DataroomFileRow {...props} />)
  })
})
