import { DocumentIcon } from 'app/pages/identity/components/UploadDocumentsForm/FileTypeIcon/DocumentIcon'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('DocumentIcon', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<DocumentIcon />)
  })
})
