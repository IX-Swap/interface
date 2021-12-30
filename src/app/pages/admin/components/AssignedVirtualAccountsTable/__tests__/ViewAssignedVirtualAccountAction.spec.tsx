import { ViewAssignedVirtualAccountAction } from 'app/pages/admin/components/AssignedVirtualAccountsTable/ViewAssignedVirtualAccountAction'
import React from 'react'
import { render } from 'test-utils'
import { assignedVirtualAccount } from '__fixtures__/virtualAccount'

describe('ViewAssignedVirtualAccountAction', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<ViewAssignedVirtualAccountAction item={assignedVirtualAccount} />)
  })
})
