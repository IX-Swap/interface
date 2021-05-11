import { AddVirtualAccountsButton } from 'app/pages/admin/components/AddVirtualAccountsButton/AddVirtualAccountsButton'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('AddVirtualAccountsButton', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<AddVirtualAccountsButton />)
  })
})
