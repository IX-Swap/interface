import { CreateDetailsOfIssuanceButton } from 'app/pages/identity/components/NoIdentityView/CreateDetailsOfIssuanceButton'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('CreateDetailsOfIssuanceButton', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CreateDetailsOfIssuanceButton />)
  })
})
