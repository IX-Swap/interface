import { AutoAssignVirtualAccountForm } from 'app/pages/accounts/pages/banks/components/AutoAssignVirtualAccountForm/AutoAssignVirtualAccountForm'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('AutoAssignVirtualAccountForm', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<AutoAssignVirtualAccountForm />)
  })
})
