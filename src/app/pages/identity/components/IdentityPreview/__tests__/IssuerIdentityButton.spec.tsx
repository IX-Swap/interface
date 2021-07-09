import { IssuerIdentityButton } from 'app/pages/identity/components/IdentityPreview/IssuerIdentityButton'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('IssuerIdentityButton', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<IssuerIdentityButton active={true} onClick={() => {}} />)
  })
})
