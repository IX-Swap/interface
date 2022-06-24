import { WithdrawalAddressesRoute } from 'app/pages/accounts/pages/withdrawalAddresses/router/config'
import { AccountsRoute } from 'app/pages/accounts/router/config'
import { PlaceOrderSuffix } from 'app/pages/invest/components/Trading/PlaceOrderSuffix'
import * as useMetamaskConnectionManager from 'app/pages/invest/hooks/useMetamaskConnectionManager'
import { AppRouterLink } from 'components/AppRouterLink'
import React from 'react'
import * as useFormContext from 'react-hook-form'
import { renderWithInitialWidth } from 'test-utils'
import {
  mockMetamaskDetailsChainDifferent,
  mockMetamaskDetailsEmptyWarning,
  mockMetamaskDetailsNotConnected,
  mockMetamaskDetailsNotWhitelisted,
  propsWithBalances,
  propsWithoutCurrency,
  propsWithoutTokens
} from '__fixtures__/metamask'

jest.mock('components/AppRouterLink', () => ({
  AppRouterLink: jest.fn(() => null)
}))

describe('PlaceOrderSuffix', () => {
  beforeEach(async () => {
    jest.clearAllMocks()
  })
  it('Renders null when all conditions are valid', () => {
    const watch = jest.fn((value: string) => 1)
    jest
      .spyOn(useMetamaskConnectionManager, 'useMetamaskConnectionManager')
      .mockReturnValueOnce(mockMetamaskDetailsEmptyWarning as any)
    jest
      .spyOn(useFormContext, 'useFormContext')
      .mockImplementation(() => ({ watch } as any))
    const { container } = renderWithInitialWidth(
      <PlaceOrderSuffix {...propsWithBalances} />,
      'lg'
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('Renders add wallet message when wallet whitelisted', () => {
    jest
      .spyOn(useMetamaskConnectionManager, 'useMetamaskConnectionManager')
      .mockReturnValueOnce(mockMetamaskDetailsNotWhitelisted as any)
    renderWithInitialWidth(<PlaceOrderSuffix {...propsWithBalances} />, 'lg')

    expect(AppRouterLink).toHaveBeenCalledWith(
      expect.objectContaining({
        to: WithdrawalAddressesRoute.create,
        underline: 'always'
      }),
      {}
    )
  })
  it('Renders switch chain when chain is not the same', () => {
    jest
      .spyOn(useMetamaskConnectionManager, 'useMetamaskConnectionManager')
      .mockReturnValueOnce(mockMetamaskDetailsChainDifferent as any)
    const { getByTestId } = renderWithInitialWidth(
      <PlaceOrderSuffix {...propsWithBalances} />,
      'lg'
    )

    expect(getByTestId('place-order-suffix-switch-chain')).toBeTruthy()
  })

  it('Renders connect wallet message when wallet is not connected', () => {
    jest
      .spyOn(useMetamaskConnectionManager, 'useMetamaskConnectionManager')
      .mockReturnValueOnce(mockMetamaskDetailsNotConnected as any)
    const { getByTestId } = renderWithInitialWidth(
      <PlaceOrderSuffix {...propsWithBalances} />,
      'lg'
    )

    expect(getByTestId('place-order-suffix-connect')).toBeTruthy()
  })
  it('Renders add balance when there is not enough currency', () => {
    jest
      .spyOn(useMetamaskConnectionManager, 'useMetamaskConnectionManager')
      .mockReturnValueOnce(mockMetamaskDetailsEmptyWarning as any)
    renderWithInitialWidth(<PlaceOrderSuffix {...propsWithoutCurrency} />, 'lg')

    expect(AppRouterLink).toHaveBeenCalledWith(
      expect.objectContaining({
        to: AccountsRoute.depositCash
      }),
      {}
    )
  })
  it('Renders no tokens when there are no tokens', () => {
    jest
      .spyOn(useMetamaskConnectionManager, 'useMetamaskConnectionManager')
      .mockReturnValueOnce(mockMetamaskDetailsEmptyWarning as any)

    const { getByTestId } = renderWithInitialWidth(
      <PlaceOrderSuffix {...propsWithoutTokens} />,
      'lg'
    )

    expect(getByTestId('place-order-suffix-no-tokens')).toBeTruthy()
  })
})
