import { Actions } from 'app/pages/admin/components/AssignedVirtualAccountsTable/Actions'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { assignedVirtualAccount } from '__fixtures__/virtualAccount'

describe('Actions', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Actions item={assignedVirtualAccount} />)
  })
})
