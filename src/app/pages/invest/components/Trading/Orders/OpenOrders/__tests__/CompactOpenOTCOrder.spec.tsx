import { columns } from 'app/pages/invest/components/Trading/Orders/OpenOrders/columns'
import * as useOpenOrderState from 'app/pages/invest/components/Trading/Orders/OpenOrders/helpers'
import { tradingQueryKeys } from 'config/queryKeys'
import React from 'react'
import { render } from 'test-utils'
import { orders } from '__fixtures__/otcOrders'
import { CompactOpenOTCOrder } from 'app/pages/invest/components/Trading/Orders/OpenOrders/CompactOpenOTCOrder'
import * as getExpiresOrderMessage from 'helpers/dates'

describe('CompactOpenOTCOrder', () => {
  const props = {
    columns: columns,
    items: orders,
    hasActions: true,
    loading: false,
    cacheQueryKey: tradingQueryKeys.getMyOpenOrdersList(
      '1234',
      '12324',
      '0x12345ef'
    )
  }
  const orderState = {
    showEmptyState: false,
    columnCount: 8,
    rowColor: jest.fn(),
    mobileRowColor: jest.fn()
  }
  it('compact open otc order matches snapshot', () => {
    jest
      .spyOn(useOpenOrderState, 'useOpenOrderState')
      .mockReturnValueOnce(orderState as any)
    jest
      .spyOn(getExpiresOrderMessage, 'getExpiresOrderMessage')
      .mockReturnValueOnce('Order expired')
    const { container } = render(<CompactOpenOTCOrder {...props} />)
    expect(container).toMatchSnapshot()
  })
})
