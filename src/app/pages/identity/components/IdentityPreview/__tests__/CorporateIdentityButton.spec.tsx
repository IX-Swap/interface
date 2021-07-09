import { CorporateIdentityButton } from 'app/pages/identity/components/IdentityPreview/CorporateIdentityButton'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('CorporateIdentityButton', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CorporateIdentityButton active={true} onClick={() => {}} />)
  })
})
