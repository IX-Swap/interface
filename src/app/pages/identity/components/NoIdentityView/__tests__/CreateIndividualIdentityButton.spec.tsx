import { CreateIndividualIdentityButton } from 'app/pages/identity/components/NoIdentityView/CreateIndividualIdentityButton'
import React from 'react'
import { render } from 'test-utils'

describe('CreateIndividualIdentityButton', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<CreateIndividualIdentityButton />)
  })
})
