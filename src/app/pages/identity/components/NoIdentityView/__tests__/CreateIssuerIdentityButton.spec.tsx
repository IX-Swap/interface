import { CreateIssuerIdentityButton } from 'app/pages/identity/components/NoIdentityView/CreateIssuerIdentityButton'
import React from 'react'
import { render } from 'test-utils'

describe('CreateIssuerIdentityButton', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<CreateIssuerIdentityButton />)
  })
})
