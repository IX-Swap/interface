import React from 'react'
import { render } from 'test-utils'
import { Form } from 'components/form/Form'
import { PlaceOrderSlider } from 'app/pages/exchange/components/PlaceOrderSlider/PlaceOrderSlider'

describe('PlaceOrderSlider', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(
      <Form>
        <PlaceOrderSlider balance={15000} />
      </Form>
    )
  })
})
