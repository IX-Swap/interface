import React from 'react'
import { render } from 'test-utils'
import { CustodyManagementTable } from 'app/pages/admin/components/CustodyManagementTable/CustodyManagementTable'
import { TableView } from 'components/TableWithPagination/TableView'
import { custodyAccounts } from 'config/apiURL'
import { custodyAccountsQueryKeys } from 'config/queryKeys'
import {
  columns,
  renderWalletAddress
} from 'app/pages/admin/components/CustodyManagementTable/columns'

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

describe('CustodyManagementTable', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
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
          type: undefined
        },
        themeVariant: 'primary',
        paperProps: { variant: 'elevation', elevation: 0 }
      }),
      {}
    )
  })

  it('returns "-" when address is empty string', () => {
    expect(renderWalletAddress('')).toEqual('-')
  })
})
