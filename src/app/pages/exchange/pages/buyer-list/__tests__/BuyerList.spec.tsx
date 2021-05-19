import React from 'react'
import { render, cleanup } from 'test-utils'
import { BuyerList } from '../BuyerList'

describe('BuyerList', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<BuyerList />)
  })
})
