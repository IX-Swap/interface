import React from 'react'
import { render, cleanup } from 'test-utils'
import { RecentWithdrawals } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/RecentWithdrawals'
import { TableView } from 'components/TableWithPagination/TableView'
import { user } from '__fixtures__/user'
import * as useAuthHook from 'hooks/auth/useAuth'
import { cashWithdrawalsQueryKeys } from 'config/queryKeys'
import { accountsURL } from 'config/apiURL'
import { virtualAccount } from '__fixtures__/virtualAccount'
import * as useFormContext from 'react-hook-form'
import * as useVirtualAccount from 'app/pages/accounts/hooks/useVirtualAccount'

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => <div data-testid='TableView' />)
}))

describe('RecentWithdrawals', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders TableView with correct props', () => {
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockImplementation(() => ({ user: user, isAuthenticated: true }))

    const useFormContextResponse = {
      watch: () => virtualAccount.accountNumber
    }

    jest
      .spyOn(useFormContext, 'useFormContext')
      .mockImplementation(() => useFormContextResponse as any)

    const useVirtualAccountResponse = {
      data: virtualAccount,
      isLoading: false
    }

    jest
      .spyOn(useVirtualAccount, 'useVirtualAccount')
      .mockImplementation(() => useVirtualAccountResponse as any)

    const uri = accountsURL.virtualAccounts.getAllTransactions(
      user._id,
      virtualAccount._id
    )
    const name = cashWithdrawalsQueryKeys.getByVirtualAccount(
      virtualAccount.accountNumber
    )

    render(<RecentWithdrawals />)

    expect(TableView).toHaveBeenCalledTimes(1)
    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({ uri, name }),
      {}
    )
  })
})
