import React from 'react'
import { render, cleanup } from 'test-utils'
import { PlaceOrderForm } from 'app/components/PlaceOrderForm/PlaceOrderForm'

describe('PlaceOrderForm', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<PlaceOrderForm />)
  })
})
