import React from 'react'
import { render, cleanup } from 'test-utils'
import { AccountsRoot } from 'app/pages/accounts/AccountsRoot'

describe('AccountsRoot', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<AccountsRoot />)
  })
})
