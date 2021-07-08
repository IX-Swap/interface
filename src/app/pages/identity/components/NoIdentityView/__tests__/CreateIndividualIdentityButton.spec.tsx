import { CreateIndividualIdentityButton } from 'app/pages/identity/components/NoIdentityView/CreateIndividualIdentityButton'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('CreateIndividualIdentityButton', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CreateIndividualIdentityButton />)
  })
})
