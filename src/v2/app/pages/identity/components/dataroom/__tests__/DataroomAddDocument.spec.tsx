/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { DocumentUploader } from 'v2/components/form/DocumentUploader'
import {
  DataroomAddDocument,
  DataroomAddDocumentProps
} from 'v2/app/pages/identity/components/dataroom/DataroomAddDocument'

jest.mock('v2/components/form/DocumentUploader', () => ({
  DocumentUploader: jest.fn(() => null)
}))

describe('DataroomAddDocument', () => {
  const props: DataroomAddDocumentProps = {
    append: jest.fn() as any
  }
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<DataroomAddDocument {...props} />)
  })
  it('renders DocumentUploader correctly', () => {
    render(<DataroomAddDocument {...props} />)

    expect(DocumentUploader).toHaveBeenCalledTimes(1)
    expect(DocumentUploader).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'TITLE', name: 'NAME' }),
      {}
    )
  })
})
