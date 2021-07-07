import { CreateCorporateIdentityButton } from 'app/pages/identity/components/NoIdentityView/CreateCorporateIdentityButton'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('CreateCorporateIdentityButton', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CreateCorporateIdentityButton />)
  })
})
