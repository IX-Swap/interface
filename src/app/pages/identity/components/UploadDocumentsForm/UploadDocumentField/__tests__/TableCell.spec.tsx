import { TableCell } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/TableCell'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('TableCell', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<TableCell />)
  })
})
