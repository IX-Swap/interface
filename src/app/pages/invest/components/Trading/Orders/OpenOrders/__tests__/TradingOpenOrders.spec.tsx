import { TradingOpenOrders } from 'app/pages/invest/components/Trading/Orders/OpenOrders/TradingOpenOrders'
import { TableView } from 'components/TableWithPagination/TableView'
import { trading } from 'config/apiURL'
import { tradingQueryKeys } from 'config/queryKeys'
import * as useAuthHook from 'hooks/auth/useAuth'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'
import * as useActiveWeb3React from 'hooks/blockchain/web3'
import React from 'react'
import { renderWithInitialWidth } from 'test-utils'
import { user } from '__fixtures__/user'

jest.mock('components/TableWithPagination/TableView', () => ({
  TableView: jest.fn(() => null)
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    pairId: '123'
  })
}))

describe('TradingOpenOrders', () => {
  it('Renders TableView with correct props', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMiniLaptop: false
    } as any)
    jest.spyOn(useActiveWeb3React, 'useActiveWeb3React').mockReturnValueOnce({
      account: '12345'
    } as any)
    jest
      .spyOn(useAuthHook, 'useAuth')
      .mockReturnValue({ user: user, isAuthenticated: true })
    renderWithInitialWidth(<TradingOpenOrders />, 'lg')
    expect(TableView).toHaveBeenCalledWith(
      expect.objectContaining({
        name: tradingQueryKeys.getMyOpenOrdersList(user._id, '123', '12345'),
        uri: trading.getMyOrdersList('12345'),
        size: 'small',
        noHeader: false,
        themeVariant: 'primary',
        hasActions: true,
        bordered: false
      }),
      {}
    )
  })
})
