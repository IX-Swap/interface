/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { renderWithUserStore, cleanup } from 'test-utils'
import { Balances } from 'v2/app/accounts/balances/Balances'
import { TableView } from 'v2/components/TableWithPagination/TableView'
import { user } from '__fixtures__/user'
import { columns } from 'v2/app/accounts/balances/columns'

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

  it('renders nothing if user is undefined', () => {
    const { container } = renderWithUserStore(<Balances />, { user: undefined })

    expect(container).toBeEmptyDOMElement()
  })

  it('renders TableView with correct props if user is presented', () => {
    renderWithUserStore(<Balances />, { user })

    expect(TableView).toHaveBeenCalledTimes(1)
    expect(TableView).toHaveBeenCalledWith(
      {
        name: `balance-${user._id}`,
        uri: `/accounts/balance/${user._id}`,
        columns
      },
      {}
    )
  })
})
