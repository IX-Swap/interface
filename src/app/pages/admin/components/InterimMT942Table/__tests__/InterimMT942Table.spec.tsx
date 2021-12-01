import React from 'react'
import { render, cleanup } from 'test-utils'
import { TableView } from 'components/TableWithPagination/TableView'
import { columns } from '../columns'
import { virtualAccountsAudit } from 'config/apiURL'
import { virtualAccountsAuditQueryKeys } from 'config/queryKeys'
import { Actions } from '../Actions'
import { InterimMT942Table } from 'app/pages/admin/components/InterimMT942Table/InterimMT942Table'

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

describe('InterimMT942Table', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<InterimMT942Table />)
  })

  it('renders TableView with correct props', () => {
    render(<InterimMT942Table />)

    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({
        hasActions: true,
        columns,
        uri: virtualAccountsAudit.getMT942Files,
        name: virtualAccountsAuditQueryKeys.getMT942Files,
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
