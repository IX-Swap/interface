import React from 'react'
import { render, cleanup } from 'test-utils'
import { WADialogActions } from 'app/pages/accounts/pages/withdrawalAddresses/WADialog/WADialogActions'

describe('WADialogActions', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<WADialogActions />)
  })
})
