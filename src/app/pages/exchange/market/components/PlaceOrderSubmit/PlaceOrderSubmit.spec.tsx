import React from 'react'
import { render, cleanup } from 'test-utils'
import { Form } from 'components/form/Form'
import { PlaceOrderSubmit } from 'app/pages/exchange/market/components/PlaceOrderSubmit/PlaceOrderSubmit'

describe('PlaceOrderSubmit', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <PlaceOrderSubmit />
      </Form>
    )
  })
})
