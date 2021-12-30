import { CreateCorporateIdentityButton } from 'app/pages/identity/components/NoIdentityView/CreateCorporateIdentityButton'
import React from 'react'
import { render } from 'test-utils'

describe('CreateCorporateIdentityButton', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<CreateCorporateIdentityButton />)
  })
})
