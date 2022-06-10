import { TableView } from 'components/TableWithPagination/TableView'
import { trading } from 'config/apiURL'
import { tradingQueryKeys } from 'config/queryKeys'
import React from 'react'
import { renderWithInitialWidth } from 'test-utils'
import { UnmatchedOrders } from '../UnmatchedOrders'

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

describe('UnmatchedOrders', () => {
  it('Renders TableView with correct props', () => {
    renderWithInitialWidth(<UnmatchedOrders side='BUY' title='Sample' />, 'lg')

    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({
        themeVariant: 'success',
        uri: trading.getUnmatchedOrders('BUY'),
        hasActions: false,
        name: tradingQueryKeys.getUnmatchedOrders('BUY')
      }),
      {}
    )
  })
})
