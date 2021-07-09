import { CreateIssuerIdentityButton } from 'app/pages/identity/components/NoIdentityView/CreateIssuerIdentityButton'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('CreateIssuerIdentityButton', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CreateIssuerIdentityButton />)
  })
})
