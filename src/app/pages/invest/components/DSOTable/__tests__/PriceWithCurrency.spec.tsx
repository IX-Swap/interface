import React from 'react'
import { render, cleanup } from 'test-utils'
import { PriceWithCurrency, PriceWithCurrencyProps } from '../PriceWithCurrency'

const sampleProps: PriceWithCurrencyProps = {
  price: '100000000',
  currency: 'SGD'
}

describe('Price With Currency', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without any error', () => {
    render(<PriceWithCurrency {...sampleProps} />)
  })

  it('renders props correctly', () => {
    const { getByText } = render(<PriceWithCurrency {...sampleProps} />)
    expect(getByText('SGD 100M')).toBeTruthy()
  })
})
