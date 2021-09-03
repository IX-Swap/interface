import React from 'react'
import { render, cleanup } from 'test-utils'
import { VirtualAccountsAuditTabView } from 'app/pages/admin/components/VirtualAccountAuditTabView/VirtualAccountsAuditTabView'

describe('VirtualAccountsAuditTabView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<VirtualAccountsAuditTabView />)
  })
})
