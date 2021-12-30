import { VirtualAccountsTabView } from 'app/pages/admin/components/VirtualAccountsTabView/VirtualAccountsTabView'
import React from 'react'
import { render } from 'test-utils'

jest.mock('components/TabPanel', () => ({
  TabPanel: jest.fn(() => null)
}))

describe('VirtualAccountsTabView', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<VirtualAccountsTabView />)
  })
})
