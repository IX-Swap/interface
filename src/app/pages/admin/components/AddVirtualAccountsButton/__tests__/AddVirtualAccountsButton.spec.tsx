import { AddVirtualAccountsButton } from 'app/pages/admin/components/AddVirtualAccountsButton/AddVirtualAccountsButton'
import React from 'react'
import { render } from 'test-utils'

describe('AddVirtualAccountsButton', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<AddVirtualAccountsButton />)
  })
})
