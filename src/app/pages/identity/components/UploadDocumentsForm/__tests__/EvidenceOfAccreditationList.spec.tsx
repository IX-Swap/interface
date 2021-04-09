import { EvidenceOfAccreditationList } from 'app/pages/identity/components/UploadDocumentsForm/EvidenceOfAccreditationList'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('EvidenceOfAccreditationList', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<EvidenceOfAccreditationList />)
  })
})
