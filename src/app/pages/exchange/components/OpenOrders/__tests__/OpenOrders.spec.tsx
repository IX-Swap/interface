import { OpenOrders } from 'app/pages/exchange/components/OpenOrders/OpenOrders'
import React from 'react'
import { cleanup, renderWithUserStore } from 'test-utils'
import { TableView } from 'components/TableWithPagination/TableView'
import { history } from 'config/history'
import { OTCMarketRoute } from 'app/pages/exchange/router/config'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

describe('OpenOrders', () => {
  beforeEach(() => {
    const objResponse = { isMiniLaptop: false }

    jest
      .spyOn(useAppBreakpoints, 'useAppBreakpoints')
      .mockImplementation(() => objResponse as any)
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    history.push(OTCMarketRoute.market, { pairId: '1234567890' })
    renderWithUserStore(<OpenOrders />)
  })

  it('renders TableView with correct props on mdUp viewport', () => {
    history.push(OTCMarketRoute.market, { pairId: '1234567890' })
    renderWithUserStore(<OpenOrders />)

    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({
        themeVariant: 'primary',
        paperProps: undefined,
        children: undefined
      }),
      {}
    )
  })

  it('renders TableView with correct props on mdDown viewport', () => {
    const objResponse = { isMiniLaptop: true }

    jest
      .spyOn(useAppBreakpoints, 'useAppBreakpoints')
      .mockImplementation(() => objResponse as any)

    history.push(OTCMarketRoute.market, { pairId: '1234567890' })
    renderWithUserStore(<OpenOrders />)

    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({
        themeVariant: 'primary',
        noHeader: true,
        paperProps: {
          variant: 'elevation',
          elevation: 0
        }
      }),
      {}
    )
  })
})
