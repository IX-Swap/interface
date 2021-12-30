import { CorporateIdentityButton } from 'app/pages/identity/components/IdentityPreview/CorporateIdentityButton'
import React from 'react'
import { render } from 'test-utils'

describe('CorporateIdentityButton', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<CorporateIdentityButton active={true} onClick={() => {}} />)
  })
})
