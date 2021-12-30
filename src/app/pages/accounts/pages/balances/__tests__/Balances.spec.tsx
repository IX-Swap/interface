import React from 'react'
import { renderWithUserStore } from 'test-utils'
import { Balances } from 'app/pages/accounts/pages/balances/Balances'
import { TableView } from 'components/TableWithPagination/TableView'
import { user } from '__fixtures__/user'
import { columns } from 'app/pages/accounts/pages/balances/columns'
import * as useAuthHook from 'hooks/auth/useAuth'
import { balanceQueryKeys } from 'config/queryKeys'

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

describe('Balances', () => {
  afterEach(async () => {})

  it.skip('renders without error', async () => {
    renderWithUserStore(<Balances />)
  })

  it('renders TableView with correct props if user exists', () => {
    jest.spyOn(useAuthHook, 'useAuth').mockReturnValue({
      isAuthenticated: true,
      user
    })

    renderWithUserStore(<Balances />)

    expect(TableView).toHaveBeenCalledWith(
      {
        name: balanceQueryKeys.getByUserId(user._id),
        uri: `/accounts/currency-balance/${user._id}`,
        columns,
        filter: {
          type: 'Currency'
        }
      },
      {}
    )
  })
})
