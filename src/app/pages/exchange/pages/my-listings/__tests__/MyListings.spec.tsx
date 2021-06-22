import React from 'react'
import { render, cleanup } from 'test-utils'
import { MyListings } from '../MyListings'

describe('MyListings', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<MyListings />)
  })
})
