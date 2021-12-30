import React from 'react'
import { render } from 'test-utils'
import { VirtualAccountsAuditTabView } from 'app/pages/admin/components/VirtualAccountAuditTabView/VirtualAccountsAuditTabView'

describe('VirtualAccountsAuditTabView', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<VirtualAccountsAuditTabView />)
  })
})
