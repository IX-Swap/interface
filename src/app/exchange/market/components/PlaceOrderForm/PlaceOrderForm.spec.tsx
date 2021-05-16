import React from 'react'
import { render, cleanup } from 'test-utils'
import { PlaceOrderForm } from 'app/exchange/market/components/PlaceOrderForm/PlaceOrderForm'
import { Form } from 'components/form/Form'

describe('PlaceOrderForm', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <PlaceOrderForm />
      </Form>
    )
  })
})
