import React from 'react'
import { render, cleanup } from 'test-utils'
import { TableView } from 'components/TableWithPagination/TableView'
import { columns } from '../columns'
import { virtualAccountsAudit } from 'config/apiURL'
import { virtualAccountsAuditQueryKeys } from 'config/queryKeys'
import { VirtualTransactionsTable } from 'app/pages/admin/components/VirtualTransactionsTable/VirtualTransactionsTable'

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

describe('VirtualTransactionsTable', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<VirtualTransactionsTable />)
  })

  it('renders TableView with correct props', () => {
    render(<VirtualTransactionsTable />)

    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({
        columns,
        uri: virtualAccountsAudit.getMT940Files,
        name: virtualAccountsAuditQueryKeys.getMT940Files,
        filter: {
          search: undefined,
          to: undefined,
          from: undefined
        },
        themeVariant: 'primary'
      }),
      {}
    )
  })
})
