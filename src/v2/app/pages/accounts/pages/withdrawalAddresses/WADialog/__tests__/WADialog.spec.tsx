import React from 'react'
import { render, cleanup } from 'test-utils'
import { WADialog } from 'v2/app/pages/accounts/pages/withdrawalAddresses/WADialog/WADialog'

describe('WADialog', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<WADialog open />)
  })
})
