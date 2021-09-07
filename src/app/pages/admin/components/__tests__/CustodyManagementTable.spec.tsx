import React from 'react'
import { render, cleanup } from 'test-utils'
import { CustodyManagementTable } from 'app/pages/admin/components/CustodyManagementTable/CustodyManagementTable'
import { TableView } from 'components/TableWithPagination/TableView'
import { virtualAccountsAudit } from 'config/apiURL'
import { virtualAccountsAuditQueryKeys } from 'config/queryKeys'
import { columns } from 'app/pages/admin/components/CustodyManagementTable/columns'
import { custodyManagementItems } from '__fixtures__/custodyAccount'

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
        uri: virtualAccountsAudit.getOutboundFiles,
        name: virtualAccountsAuditQueryKeys.getOutboundFiles,
        columns: columns,
        // TODO Remove fake items after complete backend api endpoints
        fakeItems: custodyManagementItems,
        filter: {
          search: undefined,
          to: undefined,
          from: undefined,
          // TODO Change filter name if it needs after complete backend api endpoints
          custodianFilter: undefined
        },
        themeVariant: 'primary',
        paperProps: { variant: 'elevation', elevation: 0 }
      }),
      {}
    )
  })
})
