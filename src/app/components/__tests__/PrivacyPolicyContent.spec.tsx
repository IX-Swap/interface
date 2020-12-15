import React from 'react'
import { render, cleanup } from 'test-utils'
import { PrivacyPolicyContent } from 'app/components/PrivacyPolicyContent'

describe('PrivacyPolicyContent', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<PrivacyPolicyContent />)
  })
})
