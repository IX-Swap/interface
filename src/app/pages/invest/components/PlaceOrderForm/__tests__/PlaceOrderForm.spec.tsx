import React from 'react'
import { render, fireEvent } from 'test-utils'
import { PlaceOrderForm } from 'app/pages/invest/components/PlaceOrderForm/PlaceOrderForm'
import { Form } from 'components/form/Form'
import { PlaceOrderFields } from 'app/pages/invest/components/PlaceOrderFields/PlaceOrderFields'

jest.mock(
  'app/pages/invest/components/PlaceOrderFields/PlaceOrderFields',
  () => ({
    PlaceOrderFields: jest.fn(() => null)
  })
)

describe('PlaceOrderForm', () => {
  afterEach(async () => {
    jest.clearAllMocks()
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
  it('renders the suffix', () => {
    const { getByText } = render(
      <Form>
        <PlaceOrderForm
          tokenLabel={'IXPS'}
          currencyLabel={'SGD'}
          tokenBalance={300}
          isDisabled={true}
          currencyBalance={15000}
          suffix={({ tab }: { tab: number }) => <div>TEST</div>}
          onSubmit={async () => {}}
        />
      </Form>
    )
    const suffix = getByText('TEST')
    const button = getByText('PLACE ORDER')
    expect(suffix).toBeDefined()
    expect(button).toHaveClass('Mui-disabled')
  })
})
