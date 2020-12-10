import React from 'react'
import { render } from 'test-utils'
import { TableView } from 'components/TableWithPagination/TableView'
import { DSOTable } from '../DSOTable'
import { dsoQueryKeys } from 'config/queryKeys'
import { columns } from '../columns'
import { Actions } from '../Actions'

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => 'TableView')
}))

describe('DSO Table', () => {
  it('renders without any error', () => {
    render(<DSOTable />)
  })

  it('renders TableView with correct props', () => {
    render(<DSOTable />)

    expect(TableView).toHaveBeenCalledWith(
      {
        actions: Actions,
        columns: columns,
        name: dsoQueryKeys.getList,
        hasActions: true,
        uri: `/issuance/dso/list`,
        filter: {
          search: undefined
        }
      },
      {}
    )
  })
})
