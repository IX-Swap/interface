import * as useAppTheme from 'hooks/useAppTheme'
import {
  order1,
  order2,
  order3Buy,
  order4,
  orders,
  sortedOrders
} from '__fixtures__/otcOrders'
import {
  needsConfirmation,
  renderOpenOrderPercentage,
  renderOTCOrderStatus,
  showCancelButton,
  sortOpenOrders,
  useOpenOrderState
} from 'app/pages/invest/components/Trading/Orders/OpenOrders/helpers'

import { waitFor } from '@testing-library/react'
import { act, renderHook } from '@testing-library/react-hooks'
import { columns } from 'app/pages/invest/components/Trading/Orders/OpenOrders/columns'
import * as useMetamaskConnectionManager from 'app/pages/invest/hooks/useMetamaskConnectionManager'
import { tradingQueryKeys } from 'config/queryKeys'
import * as helpers from 'helpers/numbers'
import { mockMetamaskDetailsEmptyWarning } from '__fixtures__/metamask'

describe('sortOpenOrders', () => {
  it('sorts confirmed sell orders on top', () => {
    expect(orders.sort(sortOpenOrders)).toEqual(sortedOrders)
  })
})

describe('needsConfirmation', () => {
  it('checks if a order needs confirmation correctly', () => {
    expect(needsConfirmation(order4)).toEqual(true)
  })
})

describe('renderOpenOrderPercentage', () => {
  it('renders open order percentage correctly for sell order', () => {
    jest.spyOn(helpers, 'getRoundedPercentage').mockReturnValueOnce('5%')
    expect(renderOpenOrderPercentage(order1)).toEqual('5%')
  })
  it('renders open order percentage correctly for buy order', () => {
    jest.spyOn(helpers, 'getRoundedPercentage').mockReturnValueOnce('5%')
    expect(renderOpenOrderPercentage(order2)).toEqual('5%')
  })
  it('renders 0 for buy order without pending or completed matches', () => {
    jest.spyOn(helpers, 'getRoundedPercentage').mockReturnValueOnce('5%')
    expect(renderOpenOrderPercentage(order3Buy)).toEqual('0')
  })
})

describe('showCancelButton', () => {
  it('checks if a order needs confirmation correctly', () => {
    expect(showCancelButton({ item: order4 })).toEqual(true)
    expect(showCancelButton({ item: order2 })).toEqual(false)
  })
})

describe('renderOTCOrderStatus', () => {
  it('Renders the order shown order status correctly depending on the type and matches status', () => {
    expect(renderOTCOrderStatus({ item: order4 })).toEqual('Match')
    expect(renderOTCOrderStatus({ item: order2 })).toEqual('Pending')
  })
})

describe('useOpenOrderState', () => {
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
  const theme = {
    palette: {
      mode: 'light'
    }
  }
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('return correct state for open orders', async () => {
    jest
      .spyOn(useMetamaskConnectionManager, 'useMetamaskConnectionManager')
      .mockReturnValueOnce(mockMetamaskDetailsEmptyWarning as any)
    jest
      .spyOn(useAppTheme, 'useAppTheme')
      .mockImplementation(() => ({ theme } as any))

    await act(async () => {
      const { result } = renderHook(() => useOpenOrderState(props))

      await waitFor(() => {
        expect(result.current).toEqual(
          expect.objectContaining({
            showEmptyState: false,
            columnCount: 8
          })
        )
      })
    })
  })
})
