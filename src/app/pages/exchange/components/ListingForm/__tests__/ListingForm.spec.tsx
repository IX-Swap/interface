import React from 'react'
import { render, cleanup } from 'test-utils'
import { ListingForm } from 'app/pages/exchange/components/ListingForm/ListingForm'

describe('ListingForm', () => {
  afterEach(async () => {
    await cleanup()
  })

  it('renders without error', async () => {
    render(<ListingForm />)
  })
})
