/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { renderWithUserStore, cleanup } from 'test-utils'
import { Balances } from 'v2/app/pages/accounts/pages/balances/Balances'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import { user } from '__fixtures__/user'
import { columns } from 'v2/app/pages/accounts/pages/balances/columns'
import * as useAuthHook from 'v2/hooks/auth/useAuth'

jest.mock('v2/components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

describe('Balances', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without error', async () => {
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
        name: `balance-${user._id}`,
        uri: `/accounts/balance/${user._id}`,
        columns,
        filter: {
          type: 'Currency'
        }
      },
      {}
    )
  })
})
