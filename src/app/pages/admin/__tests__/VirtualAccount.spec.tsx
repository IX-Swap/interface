import React from 'react'
import { render } from 'test-utils'
import { SelectionHelper } from 'components/SelectionHelper'
import {
  itemComparator,
  VirtualAccounts
} from 'app/pages/admin/pages/VirtualAccounts'

jest.mock('components/SelectionHelper', () => ({
  SelectionHelper: jest.fn(() => null)
}))

describe('VirtualAccounts', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<VirtualAccounts />)
  })

  it('renders SelectionHelper with correct props', () => {
    render(<VirtualAccounts />)

    expect(SelectionHelper).toBeCalledWith(
      expect.objectContaining({
        itemComparator: itemComparator
      }),
      {}
    )
  })
})
