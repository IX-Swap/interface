import { IssuerIdentityButton } from 'app/pages/identity/components/IdentityPreview/IssuerIdentityButton'
import React from 'react'
import { render } from 'test-utils'

describe('IssuerIdentityButton', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<IssuerIdentityButton active={true} onClick={() => {}} />)
  })
})
