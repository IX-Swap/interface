import React from 'react'
import { render, cleanup } from 'test-utils'
import { EvidenceOfAccreditationHelper } from 'app/pages/identity/components/UploadDocumentsForm/EvidenceOfAccreditationHelper'

describe('EvidenceOfAccreditationHelper', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<EvidenceOfAccreditationHelper />)
  })
})
