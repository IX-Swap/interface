import React from 'react'
import { render, cleanup } from 'test-utils'
import { PlaceOrderForm } from 'app/pages/exchange/market/components/PlaceOrderForm/PlaceOrderForm'
import { Form } from 'components/form/Form'

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
})
