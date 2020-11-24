import React from 'react'
import { render, cleanup } from 'test-utils'
import { WADialogContent } from 'v2/app/pages/accounts/pages/withdrawalAddresses/WADialog/WADialogContent'

describe('WADialogContent', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<WADialogContent />)
  })
})
