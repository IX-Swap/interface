import React from 'react'
import { render, cleanup } from 'test-utils'
import { SelectionHelper } from 'components/SelectionHelper'
import { VirtualAccounts } from 'app/pages/admin/pages/VirtualAccounts'

jest.mock(
  'app/pages/admin/components/UnassignedAccountTable/UnassignedAccountTable',
  () => ({
    UnassignedAccountTable: jest.fn(() => null)
  })
)

jest.mock('components/SelectionHelper', () => ({
  SelectionHelper: jest.fn(() => null)
}))

describe('VirtualAccounts', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<VirtualAccounts />)
  })

  it('renders with SelectionHelper', () => {
    render(<VirtualAccounts />)

    expect(SelectionHelper).toBeCalled()
  })
})
