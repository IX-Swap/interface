import React from 'react'
import { renderWithUserStore } from 'test-utils'
import { CashTable } from 'app/pages/accounts/pages/cash/components/CashTable'
import { TableView } from 'ui/UIKit/TablesKit/components/TableView/TableView'
import { user } from '__fixtures__/user'
import {
  balanceQueryKeys,
  cashVirtualTransactionsQueryKeys
} from 'config/queryKeys'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'
import { columns } from 'app/pages/accounts/pages/cash/components/transactionColumns'
import { RecentTransactionsTable } from '../RecentTransactionsTable'
import { generateQueryResult } from '__fixtures__/useQuery'
import { virtualAccountsSample } from '__fixtures__/virtualAccounts'
import * as useVirtualAccount from 'app/pages/accounts/hooks/useVirtualAccount'
import { accountsURL } from 'config/apiURL'
import * as useAuthHook from 'hooks/auth/useAuth'

jest.mock('ui/UIKit/TablesKit/components/TableView/TableView', () => ({
  TableView: jest.fn(() => null)
}))

describe('RecentTransactions', () => {
  it('renders TableView with correct props', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isTablet: false
    } as any)
    jest.spyOn(useAuthHook, 'useAuth').mockReturnValue({
      isAuthenticated: true,
      user
    })
    const useVirtualAccountsResponse = generateQueryResult({
      data: virtualAccountsSample[0],
      isLoading: false
    })

    jest
      .spyOn(useVirtualAccount, 'useVirtualAccount')
      .mockImplementation(() => useVirtualAccountsResponse as any)
    renderWithUserStore(<RecentTransactionsTable />)

    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({
        uri: accountsURL.virtualAccounts.getUserTransactions(user._id),
        name: cashVirtualTransactionsQueryKeys.getByVirtualAccount(user._id),
        columns: columns,
        noHeader: false
      }),
      {}
    )
  })
})
