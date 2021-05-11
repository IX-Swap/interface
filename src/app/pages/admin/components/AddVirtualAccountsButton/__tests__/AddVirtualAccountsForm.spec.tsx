import { AddVirtualAccountsForm } from 'app/pages/admin/components/AddVirtualAccountsButton/AddVirtualAccountsForm'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('AddVirtualAccounts', () => {
  const closeFn = jest.fn()

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<AddVirtualAccountsForm closeDialog={closeFn} />)
  })
})
