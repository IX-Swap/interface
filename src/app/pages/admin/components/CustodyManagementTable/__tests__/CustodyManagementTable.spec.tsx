import React from 'react'
import { render, cleanup } from 'test-utils'
import { CustodyManagementTable } from 'app/pages/admin/components/CustodyManagementTable/CustodyManagementTable'
import { TableView } from 'components/TableWithPagination/TableView'
import { custodyAccounts } from 'config/apiURL'
import { custodyAccountsQueryKeys } from 'config/queryKeys'
import { columns } from 'app/pages/admin/components/CustodyManagementTable/columns'

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

describe('CustodyManagementTable', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<CustodyManagementTable />)
  })

  it('renders table with correct props', () => {
    render(<CustodyManagementTable />)
    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({
        uri: custodyAccounts.getList,
        name: custodyAccountsQueryKeys.getList,
        hasActions: true,
        columns: columns,
        filter: {
          search: undefined,
          to: undefined,
          from: undefined,
          // TODO Change filter value after complete backend api endpoints
          type: []
        },
        themeVariant: 'primary',
        paperProps: { variant: 'elevation', elevation: 0 }
      }),
      {}
    )
  })
})
