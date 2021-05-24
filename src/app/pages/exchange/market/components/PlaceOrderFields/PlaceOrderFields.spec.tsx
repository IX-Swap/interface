import React from 'react'
import { render, cleanup } from 'test-utils'
import { Form } from 'components/form/Form'
import { PlaceOrderFields } from 'app/pages/exchange/market/components/PlaceOrderFields/PlaceOrderFields'

jest.mock('components/form/TypedField', () => ({
  TypedField: jest.fn(() => <input />)
}))

describe('PlaceOrderFields', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <PlaceOrderFields balance={15000} totalCurrencyLabel={'IXPS'} />
      </Form>
    )
  })
})
