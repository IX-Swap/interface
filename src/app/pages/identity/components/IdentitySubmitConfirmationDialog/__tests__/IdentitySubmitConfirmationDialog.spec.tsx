import { IdentitySubmitConfirmationDialog } from 'app/pages/identity/components/IdentitySubmitConfirmationDialog/IdentitySubmitConfirmationDialog'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('IdentitySubmitConfirmation', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<IdentitySubmitConfirmationDialog open closeDialog={() => {}} />)
  })
})
