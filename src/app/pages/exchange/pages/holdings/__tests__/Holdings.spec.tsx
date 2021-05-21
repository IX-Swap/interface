import React from 'react'
import { render, cleanup } from 'test-utils'
import { Holdings } from '../Holdings'

describe('Holdings', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Holdings />)
  })
})
