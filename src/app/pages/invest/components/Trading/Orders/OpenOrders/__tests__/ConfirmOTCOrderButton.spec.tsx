import { ConfirmOTCOrderButton } from 'app/pages/invest/components/Trading/Orders/OpenOrders/ConfirmOTCOrderButton'
import { getColumnMatchedOrder } from 'app/pages/invest/components/Trading/Orders/OpenOrders/helpers'
import * as useConfirmMyOrder from 'app/pages/invest/hooks/useConfirmMyOrder'
import * as usePairTokenAddressNetwork from 'app/pages/invest/hooks/usePairTokenAddressNetwork'
import * as useSendToken from 'app/pages/invest/hooks/useSendToken'
import * as useAppBreakpoints from 'hooks/useAppBreakpoints'
import React from 'react'
import { render } from 'test-utils'
import { fakeOTCMatch1, order1Open } from '__fixtures__/otcOrders'

describe('ConfirmOTCOrderButton', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })
  const confirmOrder = jest.fn()

  const loadingResponse = [confirmOrder, { isLoading: true }]
  const notLoadingResponse = [confirmOrder, { isLoading: false }]
  jest
    .spyOn(useSendToken, 'useSendToken')
    .mockImplementation(() => jest.fn() as any)
  jest
    .spyOn(usePairTokenAddressNetwork, 'usePairTokenAddressNetwork')
    .mockReturnValueOnce({
      chainId: 137
    } as any)
  it('Renders confirm button desktop', () => {
    jest
      .spyOn(useConfirmMyOrder, 'useConfirmMyOrder')
      .mockImplementation(() => notLoadingResponse as any)
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMiniLaptop: false
    } as any)
    const { getByTestId } = render(
      <ConfirmOTCOrderButton
        order={getColumnMatchedOrder(order1Open, fakeOTCMatch1)}
      />
    )
    expect(getByTestId('confirmButton')).toBeDefined()
  })
  it('Renders loader', () => {
    jest
      .spyOn(useConfirmMyOrder, 'useConfirmMyOrder')
      .mockImplementation(() => loadingResponse as any)
    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMiniLaptop: false
    } as any)
    const { getByTestId } = render(
      <ConfirmOTCOrderButton
        order={getColumnMatchedOrder(order1Open, fakeOTCMatch1)}
      />
    )
    expect(getByTestId('loader')).toBeDefined()
  })
  it('Renders confirm button mobile', () => {
    jest
      .spyOn(useConfirmMyOrder, 'useConfirmMyOrder')
      .mockImplementation(() => notLoadingResponse as any)

    jest.spyOn(useAppBreakpoints, 'useAppBreakpoints').mockReturnValueOnce({
      isMiniLaptop: true
    } as any)
    const { getByTestId } = render(
      <ConfirmOTCOrderButton
        order={getColumnMatchedOrder(order1Open, fakeOTCMatch1)}
      />
    )
    expect(getByTestId('confirmButtonMobile')).toBeDefined()
  })
})
