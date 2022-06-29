import { render } from '@testing-library/react'
import { PlaceOrderForm } from 'app/pages/invest/components/PlaceOrderForm/PlaceOrderForm'
import { PlaceOrderFormDialog } from 'app/pages/invest/components/PlaceOrderForm/PlaceOrderFormDialog'
import * as useCurrencyBalance from 'app/pages/invest/hooks/useCurrencyBalance'
import { TradingOrders } from 'app/pages/invest/components/Trading/Orders/TradingOrders'
import { TradingBody } from 'app/pages/invest/components/Trading/TradingBody'
import * as useStyles from 'app/pages/invest/components/Trading/TradingContainer.styles'
import * as useCreateOTCOrder from 'app/pages/invest/hooks/useCreateOTCOrder'
import * as useFeaturedPairNames from 'app/pages/invest/hooks/useFeaturedPairNames'
import * as useMetamaskConnectionManager from 'app/pages/invest/hooks/useMetamaskConnectionManager'
import * as usePairTokenAddressNetwork from 'app/pages/invest/hooks/usePairTokenAddressNetwork'
import * as useCryptoBalance from 'hooks/blockchain/useCryptoBalance'
import * as useActiveWeb3React from 'hooks/blockchain/web3'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'
import React from 'react'
import { mockMetamaskDetailsEmptyWarning } from '__fixtures__/metamask'
import { generateMutationResult } from '__fixtures__/useQuery'

jest.mock('app/pages/invest/components/PlaceOrderForm/PlaceOrderForm', () => ({
  PlaceOrderForm: jest.fn(() => null)
}))
jest.mock('app/pages/invest/components/Trading/Orders/TradingOrders', () => ({
  TradingOrders: jest.fn(() => null)
}))
jest.mock(
  'app/pages/invest/components/PlaceOrderForm/PlaceOrderFormDialog',
  () => ({
    PlaceOrderFormDialog: jest.fn(() => null)
  })
)
jest.mock('app/pages/invest/components/Trading/PlaceOrderSuffix', () => ({
  PlaceOrderSuffix: jest.fn(() => null)
}))

describe('TradingBody', () => {
  const create = jest.fn(() => new Promise(resolve => resolve(1)))
  const objResponse = [create, generateMutationResult({})]
  beforeEach(() => {
    jest.spyOn(useActiveWeb3React, 'useActiveWeb3React').mockReturnValueOnce({
      account: '12345'
    } as any)
    jest
      .spyOn(usePairTokenAddressNetwork, 'usePairTokenAddressNetwork')
      .mockReturnValueOnce({
        address: '12345'
      } as any)
    jest
      .spyOn(useCreateOTCOrder, 'useCreateOTCOrder')
      .mockImplementation(() => objResponse as any)
    jest
      .spyOn(useFeaturedPairNames, 'useFeaturedPairNames')
      .mockReturnValueOnce({
        currencyName: 'test-name',
        tokenName: 'test-token'
      } as any)
    jest
      .spyOn(useStyles, 'useStyles')
      .mockReturnValueOnce({ colorGrid: 'abc' } as any)
    jest
      .spyOn(useMetamaskConnectionManager, 'useMetamaskConnectionManager')
      .mockReturnValueOnce(mockMetamaskDetailsEmptyWarning as any)
    jest.spyOn(useCryptoBalance, 'useCryptoBalance').mockReturnValueOnce(1000)
    jest
      .spyOn(useCurrencyBalance, 'useCurrencyBalance')
      .mockReturnValueOnce(500)
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders TradingBody desktop correctly', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValue({
      isMiniLaptop: false
    } as any)
    render(<TradingBody />)
    expect(TradingOrders).toHaveBeenCalledTimes(1)
    expect(PlaceOrderForm).toHaveBeenCalledWith(
      expect.objectContaining({
        createOrderStatus: '',
        isFetching: false,
        currencyLabel: 'test-name',
        tokenLabel: 'test-token',
        isDisabled: false,
        currencyBalance: 500
      }),
      {}
    )
  })
  it('renders TradingBody mobile correctly', () => {
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMiniLaptop: true
    } as any)
    render(<TradingBody />)
    expect(TradingOrders).toHaveBeenCalledTimes(1)
    expect(PlaceOrderFormDialog).toHaveBeenCalledWith(
      expect.objectContaining({
        createOrderStatus: '',
        isFetching: false,
        symbol: 'test-name',
        currencyBalance: 500,
        currencyName: 'test-name',
        tokenName: 'test-token',
        tokenBalance: { data: { amount: 1000 } }
      }),
      {}
    )
  })
})
