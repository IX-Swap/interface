import React from 'react'
import { render } from 'test-utils'
import { TableView } from 'components/TableWithPagination/TableView'
import { columns } from '../columns'
import { EODMT940Table } from 'app/pages/admin/components/EODMT940Table/EODMT940Table'
import { virtualAccountsAudit } from 'config/apiURL'
import { virtualAccountsAuditQueryKeys } from 'config/queryKeys'
import { Actions } from 'app/pages/admin/components/EODMT940Table/Actions'

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

describe('EODMT940Table', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders TableView with correct props', () => {
    render(<EODMT940Table />)

    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({
        hasActions: true,
        columns,
        uri: virtualAccountsAudit.getMT940Files,
        name: virtualAccountsAuditQueryKeys.getMT940Files,
        actions: Actions,
        noHeader: true,
        filter: {
          search: undefined,
          to: undefined,
          from: undefined
        },
        themeVariant: 'default',
        paperProps: { variant: 'elevation', elevation: 0 }
      }),
      {}
    )
  })
})
