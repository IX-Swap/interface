import React from 'react'
import { render } from 'test-utils'
import { TermsOfUseContent } from 'app/components/TermsOfUseContent'

describe('TermsOfUseContent', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<TermsOfUseContent />)
  })
})
