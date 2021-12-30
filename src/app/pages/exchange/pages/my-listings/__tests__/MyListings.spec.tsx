import React from 'react'
import { render } from 'test-utils'
import { MyListings } from '../MyListings'

describe('MyListings', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<MyListings />)
  })
})
