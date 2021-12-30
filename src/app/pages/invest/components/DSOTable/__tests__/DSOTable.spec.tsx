import React from 'react'
import { render } from 'test-utils'
import { TableView } from 'components/TableWithPagination/TableView'
import { DSOTable } from '../DSOTable'
import { dsoQueryKeys } from 'config/queryKeys'
import { columns } from '../columns'
import { Actions } from '../Actions'
import { issuanceURL } from 'config/apiURL'

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => 'TableView')
}))

describe('DSO Table', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without any error', () => {
    render(<DSOTable />)
  })

  it('renders TableView with correct props', () => {
    render(<DSOTable />)

    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({
        actions: Actions,
        columns: columns,
        name: dsoQueryKeys.getApprovedList,
        hasActions: true,
        uri: issuanceURL.dso.getAllApproved,
        filter: {
          search: undefined,
          capitalStructure: undefined,
          currency: undefined,
          isPriceAscending: undefined,
          network: undefined
        },
        themeVariant: 'primary'
      }),
      {}
    )
  })
})
