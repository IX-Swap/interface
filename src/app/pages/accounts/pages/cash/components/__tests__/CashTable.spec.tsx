import { ActiveElementContextWrapper } from 'app/context/ActiveElementContextWrapper'
import { CashTable } from 'app/pages/accounts/pages/cash/components/CashTable'
import { columns } from 'app/pages/accounts/pages/cash/components/columns'
import { balanceQueryKeys } from 'config/queryKeys'
import * as useAuthHook from 'hooks/auth/useAuth'
import React from 'react'
import { renderWithUserStore } from 'test-utils'
import { TableView } from 'ui/UIKit/TablesKit/components/TableView/TableView'
import { user } from '__fixtures__/user'

jest.mock('ui/UIKit/TablesKit/components/TableView/TableView', () => ({
  TableView: jest.fn(() => null)
}))

describe('Balances', () => {
  it('renders TableView with correct props if user exists', () => {
    jest.spyOn(useAuthHook, 'useAuth').mockReturnValue({
      isAuthenticated: true,
      user
    })

    renderWithUserStore(
      <ActiveElementContextWrapper>
        <CashTable />
      </ActiveElementContextWrapper>
    )

    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({
        name: balanceQueryKeys.getByUserId(user._id),
        uri: `/virtual-accounts/${user._id}`,
        columns,
        filter: {
          type: 'Currency'
        },
        method: 'GET',
        actionHeader: 'Actions',
        noHeader: false
      }),
      {}
    )
  })
})
