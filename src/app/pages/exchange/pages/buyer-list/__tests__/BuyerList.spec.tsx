import React from 'react'
import { render } from 'test-utils'
import { BuyerList } from '../BuyerList'

describe('BuyerList', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<BuyerList />)
  })
})
