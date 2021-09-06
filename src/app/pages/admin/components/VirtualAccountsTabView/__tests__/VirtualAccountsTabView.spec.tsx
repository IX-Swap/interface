import { VirtualAccountsTabView } from 'app/pages/admin/components/VirtualAccountsTabView/VirtualAccountsTabView'
import React from 'react'
import { render, cleanup } from 'test-utils'

jest.mock('components/TabPanel', () => ({
  TabPanel: jest.fn(() => null)
}))

describe('VirtualAccountsTabView', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<VirtualAccountsTabView />)
  })
})
