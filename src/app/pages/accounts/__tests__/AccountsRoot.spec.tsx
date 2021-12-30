import React from 'react'
import { render } from 'test-utils'
import { AccountsRoot } from 'app/pages/accounts/AccountsRoot'

describe('AccountsRoot', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<AccountsRoot />)
  })
})
