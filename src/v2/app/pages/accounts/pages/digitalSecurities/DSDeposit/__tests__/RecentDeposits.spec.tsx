/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { RecentDeposits } from 'v2/app/pages/accounts/pages/digitalSecurities/DSDeposit/RecentDeposits'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import storageHelper from 'v2/helpers/storageHelper'

jest.mock('v2/components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => <div data-testid='TableView'></div>)
}))

describe('RecentDeposits', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<RecentDeposits />)
  })

  it('renders TableView with props correctly', () => {
    const userId = 'testUserId'
    jest.spyOn(storageHelper, 'getUserId').mockReturnValue(userId)
    const uri = `/accounts/security/deposits/list/${userId}`
    const name = `ds-deposits-${userId}`

    render(<RecentDeposits />)
    expect(TableView).toHaveBeenCalledTimes(1)
    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({ uri, name }),
      {}
    )
  })
})
