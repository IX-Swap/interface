import { Actions } from 'app/pages/admin/components/AssignedVirtualAccountsTable/Actions'
import React from 'react'
import { render } from 'test-utils'
import { assignedVirtualAccount } from '__fixtures__/virtualAccount'

describe('Actions', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<Actions item={assignedVirtualAccount} />)
  })
})
