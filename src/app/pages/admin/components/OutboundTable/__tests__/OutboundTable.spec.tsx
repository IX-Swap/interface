import React from 'react'
import { render } from 'test-utils'
import { TableView } from 'components/TableWithPagination/TableView'
import { columns } from '../columns'
import { virtualAccountsAudit } from 'config/apiURL'
import { virtualAccountsAuditQueryKeys } from 'config/queryKeys'
import { Actions } from '../Actions'
import { OutboundTable } from 'app/pages/admin/components/OutboundTable/OutboundTable'

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

describe('OutboundTable', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders TableView with correct props', () => {
    render(<OutboundTable />)

    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({
        hasActions: true,
        columns,
        uri: virtualAccountsAudit.getOutboundFiles,
        name: virtualAccountsAuditQueryKeys.getOutboundFiles,
        actions: Actions,
        filter: {
          search: undefined,
          to: undefined,
          from: undefined
        },
        themeVariant: 'default',
        noHeader: true,
        paperProps: { variant: 'elevation', elevation: 0 }
      }),
      {}
    )
  })
})
