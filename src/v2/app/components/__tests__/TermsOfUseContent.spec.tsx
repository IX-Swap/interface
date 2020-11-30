import React from 'react'
import { render, cleanup } from 'test-utils'
import { TermsOfUseContent } from 'v2/app/components/TermsOfUseContent'

describe('TermsOfUseContent', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<TermsOfUseContent />)
  })
})
