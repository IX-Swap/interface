import React from 'react'
import { render } from 'test-utils'
import { Form } from 'components/form/Form'
import { PlaceOrderFields } from 'app/pages/exchange/components/PlaceOrderFields/PlaceOrderFields'

describe('PlaceOrderFields', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <Form>
        <PlaceOrderFields balance={15000} totalCurrencyLabel={'IXPS'} />
      </Form>
    )
  })
})
