import React from 'react'
import { render } from 'test-utils'
import { RecentDeposits } from 'app/pages/accounts/pages/banks/pages/DepositCash/RecentDeposits'
import { TableView } from 'components/TableWithPagination/TableView'
import { user } from '__fixtures__/user'
import { columns } from '../columns'
import * as useAuth from 'hooks/auth/useAuth'
import { cashDepositsQueryKeys } from 'config/queryKeys'
import { accountsURL } from 'config/apiURL'
import * as useVirtualAccount from 'app/pages/accounts/hooks/useVirtualAccount'
import { virtualAccount } from '__fixtures__/virtualAccount'
import { getIdFromObj } from 'helpers/strings'

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => <div data-testid='TableView' />)
}))

describe('RecentDeposits', () => {
  beforeEach(() => {
    const objResponse = {
      data: virtualAccount,
      isLoading: false
    }

    jest
      .spyOn(useVirtualAccount, 'useVirtualAccount')
      .mockImplementation(() => objResponse as any)

    const useAuthResponse = {
      user: user
    }

    jest
      .spyOn(useAuth, 'useAuth')
      .mockImplementation(() => useAuthResponse as any)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders TableView with correct props', () => {
    const userId = getIdFromObj(user)
    const uri = accountsURL.virtualAccounts.getAllTransactions(
      userId,
      virtualAccount._id
    )
    const name = cashDepositsQueryKeys.getByVirtualAccount(
      virtualAccount.accountNumber
    )
    const filter = { sourceType: 'Deposit' }

    render(
      <RecentDeposits virtualAccountNumber={virtualAccount.accountNumber} />
    )
    expect(TableView).toHaveBeenCalledTimes(1)
    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({ uri, name, columns, filter }),
      {}
    )
  })
})
