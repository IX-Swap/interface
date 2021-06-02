import React from 'react'
import { render, cleanup } from 'test-utils'
import { Form } from 'components/form/Form'
import { PlaceOrderSlider } from 'app/pages/exchange/components/PlaceOrderSlider/PlaceOrderSlider'

describe('PlaceOrderSlider', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <PlaceOrderSlider balance={15000} />
      </Form>
    )
  })
})
