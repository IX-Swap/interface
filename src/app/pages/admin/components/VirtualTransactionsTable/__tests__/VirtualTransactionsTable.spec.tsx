import React from 'react'
import { render } from 'test-utils'
import { TableView } from 'components/TableWithPagination/TableView'
import { columns } from '../columns'
import { virtualTransactions } from 'config/apiURL'
import { virtualTransactionsQueryKeys } from 'config/queryKeys'
import { VirtualTransactionsTable } from 'app/pages/admin/components/VirtualTransactionsTable/VirtualTransactionsTable'

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

describe('VirtualTransactionsTable', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<VirtualTransactionsTable />)
  })

  it('renders TableView with correct props', () => {
    render(<VirtualTransactionsTable />)

    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({
        columns,
        uri: virtualTransactions.getTransactions,
        name: virtualTransactionsQueryKeys.getTransactions,
        filter: {
          search: undefined,
          to: undefined,
          from: undefined,
          currency: undefined,
          direction: undefined,
          paymentMethod: undefined
        },
        themeVariant: 'primary'
      }),
      {}
    )
  })
})
