import { AddVirtualAccountsForm } from 'app/pages/admin/components/AddVirtualAccountsButton/AddVirtualAccountsForm'
import React from 'react'
import { render } from 'test-utils'

describe('AddVirtualAccounts', () => {
  const closeFn = jest.fn()

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<AddVirtualAccountsForm closeDialog={closeFn} />)
  })
})
