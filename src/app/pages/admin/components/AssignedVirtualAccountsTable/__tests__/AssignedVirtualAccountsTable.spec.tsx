import { AssignedVirtualAccountsTable } from 'app/pages/admin/components/AssignedVirtualAccountsTable/AssignedVirtualAccountsTable'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('AssignedVirtualAccountsTable', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<AssignedVirtualAccountsTable />)
  })
})
