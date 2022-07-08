import { TableView } from 'components/TableWithPagination/TableView'
import { trading } from 'config/apiURL'
import { tradingQueryKeys } from 'config/queryKeys'
import React from 'react'
import { renderWithInitialWidth } from 'test-utils'
import { PastOTCOrders } from 'app/pages/invest/components/Trading/Orders/PastOrders/PastOTCOrders'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

describe('PastOTCORders', () => {
  it('Renders TableView with correct props', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMiniLaptop: false
    } as any)
    renderWithInitialWidth(<PastOTCOrders />, 'lg')

    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({
        name: tradingQueryKeys.pastOrders,
        uri: trading.getMyPastOrders,
        themeVariant: 'primary',
        noHeader: undefined
      }),
      {}
    )
  })
})
