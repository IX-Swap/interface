import React from 'react'
import { render, cleanup } from 'test-utils'
import { PlaceOrderFormDialog } from 'app/pages/exchange/components/PlaceOrderForm/PlaceOrderFormDialog'
import { MarketViewProps } from 'app/pages/exchange/components/Market/MarketGridView'
import { PlaceOrderForm } from 'app/pages/exchange/components/PlaceOrderForm/PlaceOrderForm'
import { fireEvent } from '@testing-library/react'

jest.mock(
  'app/pages/exchange/components/PlaceOrderForm/PlaceOrderForm',
  () => ({
    PlaceOrderForm: jest.fn(() => null)
  })
)

describe('PlaceOrderFormDialog', () => {
  const props: MarketViewProps = {
    symbol: 'SYMBOL',
    datafeed: undefined,
    createOrderStatus: 'success',
    isFetching: false,
    currencyName: 'SGD',
    tokenName: 'Token Name',
    currencyBalance: 10000,
    tokenBalance: { data: { amount: 1000 } },
    submitForm: jest.fn()
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<PlaceOrderFormDialog {...props} />)
  })

  it('opens drawer with buy tab active when Buy button is pressed', () => {
    const { getByRole } = render(<PlaceOrderFormDialog {...props} />)
    const buyButton = getByRole('button', {
      name: 'Buy'
    }) as HTMLButtonElement
    fireEvent.click(buyButton, { bubbles: true, cancellable: true })

    expect(PlaceOrderForm).toHaveBeenCalledWith(
      expect.objectContaining({
        defaultActiveTab: 0
      }),
      {}
    )
  })

  it('opens drawer with sell tab active when Sell button is pressed', () => {
    const { getByRole } = render(<PlaceOrderFormDialog {...props} />)
    const buyButton = getByRole('button', {
      name: 'Sell'
    }) as HTMLButtonElement
    fireEvent.click(buyButton, { bubbles: true, cancellable: true })

    expect(PlaceOrderForm).toHaveBeenCalledWith(
      expect.objectContaining({
        defaultActiveTab: 1,
        tokenBalance: 1000
      }),
      {}
    )
  })

  it('renders PlaceOrderForm with correct props', () => {
    const { getByRole } = render(
      <PlaceOrderFormDialog {...props} tokenBalance={undefined} />
    )
    const buyButton = getByRole('button', {
      name: 'Sell'
    }) as HTMLButtonElement
    fireEvent.click(buyButton, { bubbles: true, cancellable: true })

    expect(PlaceOrderForm).toHaveBeenCalledWith(
      expect.objectContaining({
        defaultActiveTab: 1,
        tokenBalance: 0
      }),
      {}
    )
  })
})
