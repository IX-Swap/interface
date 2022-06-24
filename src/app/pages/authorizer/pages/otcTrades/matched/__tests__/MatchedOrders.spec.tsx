import { TableView } from 'components/TableWithPagination/TableView'
import { trading } from 'config/apiURL'
import { tradingQueryKeys } from 'config/queryKeys'
import React from 'react'
import { renderWithInitialWidth } from 'test-utils'
import {
  MatchedOrders,
  Actions
} from 'app/pages/authorizer/pages/otcTrades/matched/MatchedOrders'
import * as useConfirmMatchOrder from 'app/pages/authorizer/hooks/useConfirmMatchOrder'
import { order1, order4 } from '__fixtures__/otcOrders'

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

describe('Matched Orders', () => {
  it('Renders TableView with correct props', () => {
    renderWithInitialWidth(<MatchedOrders />, 'lg')

    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({
        themeVariant: 'primary',
        uri: trading.getMatchedOrders,
        hasActions: true,
        name: tradingQueryKeys.getMatchedOrders
      }),
      {}
    )
  })
})

describe('Matched Orders Actions', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })
  const confirmOrder = jest.fn()
  const objResponse = [confirmOrder, { isLoading: false }]
  jest
    .spyOn(useConfirmMatchOrder, 'useConfirmMatchOrder')
    .mockImplementation(() => objResponse as any)
  it('Renders status instead of Actions', () => {
    const { getByTestId } = renderWithInitialWidth(
      <Actions
        item={order4}
        cacheQueryKey={tradingQueryKeys.getMatchedOrders}
      />,
      'lg'
    )
    expect(getByTestId('matchOrderStatus')).toBeDefined()
  })
  it('Renders Actions', () => {
    const { getByTestId } = renderWithInitialWidth(
      <Actions
        item={order1}
        cacheQueryKey={tradingQueryKeys.getMatchedOrders}
      />,
      'lg'
    )
    expect(getByTestId('matchOrderConfirm')).toBeDefined()
  })
})
