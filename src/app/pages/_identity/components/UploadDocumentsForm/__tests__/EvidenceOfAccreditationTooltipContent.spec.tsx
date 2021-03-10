import { EvindenceOfAccreditationTooltipContent } from 'app/pages/_identity/components/UploadDocumentsForm/EvindenceOfAccreditationTooltipContent'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('EvidenceOfAccreditationTooltipContent', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<EvindenceOfAccreditationTooltipContent />)
  })
})
