import React from 'react'
import { render, fireEvent, cleanup } from 'test-utils'
import { PlaceOrderForm } from 'app/pages/exchange/components/PlaceOrderForm/PlaceOrderForm'
import { Form } from 'components/form/Form'
import { PlaceOrderFields } from 'app/pages/exchange/components/PlaceOrderFields/PlaceOrderFields'

jest.mock(
  'app/pages/exchange/components/PlaceOrderFields/PlaceOrderFields',
  () => ({
    PlaceOrderFields: jest.fn(() => null)
  })
)

describe('PlaceOrderForm', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <PlaceOrderForm
          tokenLabel={'IXPS'}
          currencyLabel={'SGD'}
          tokenBalance={300}
          currencyBalance={15000}
          onSubmit={async () => {}}
        />
      </Form>
    )
  })

  it('renders PlaceOrderFields with correct props if BUY tab active', () => {
    render(
      <Form>
        <PlaceOrderForm
          tokenLabel={'IXPS'}
          currencyLabel={'SGD'}
          tokenBalance={300}
          currencyBalance={15000}
          onSubmit={async () => {}}
        />
      </Form>
    )

    expect(PlaceOrderFields).toBeCalledWith(
      expect.objectContaining({
        balance: 15000,
        totalCurrencyLabel: 'SGD'
      }),
      {}
    )
  })

  it('renders PlaceOrderFields with correct props if SELL tab active', () => {
    const { getByText } = render(
      <Form>
        <PlaceOrderForm
          tokenLabel={'IXPS'}
          currencyLabel={'SGD'}
          tokenBalance={300}
          currencyBalance={15000}
          onSubmit={async () => {}}
        />
      </Form>
    )
    const sellTab = getByText('SELL')
    fireEvent.click(sellTab)

    expect(PlaceOrderFields).toBeCalledWith(
      expect.objectContaining({
        balance: 300,
        totalCurrencyLabel: 'SGD'
      }),
      {}
    )
  })
})
