/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { RecentWithdrawals } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/RecentWithdrawals'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import storageHelper from 'v2/helpers/storageHelper'
import { user } from '__fixtures__/user'

jest.mock('v2/components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => <div data-testid='TableView'></div>)
}))

describe('RecentWithdrawals', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders TableView with correct props', () => {
    jest.spyOn(storageHelper, 'getUserId').mockReturnValue(user._id)
    const uri = `/accounts/cash/withdrawals/list/${user._id}`
    const name = `cash-withdrawals-${user._id}`

    render(<RecentWithdrawals />)
    expect(TableView).toHaveBeenCalledTimes(1)
    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({ uri, name }),
      {}
    )
  })
})
