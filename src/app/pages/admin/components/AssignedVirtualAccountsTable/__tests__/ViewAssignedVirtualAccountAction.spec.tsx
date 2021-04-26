import { ViewAssignedVirtualAccountAction } from 'app/pages/admin/components/AssignedVirtualAccountsTable/ViewAssignedVirtualAccountAction'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { assignedVirtualAccount } from '__fixtures__/virtualAccount'

describe('ViewAssignedVirtualAccountAction', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<ViewAssignedVirtualAccountAction item={assignedVirtualAccount} />)
  })
})
