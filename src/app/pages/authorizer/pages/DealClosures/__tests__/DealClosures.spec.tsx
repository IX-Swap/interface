import { DealClosures } from 'app/pages/authorizer/pages/DealClosures/DealClosures'
import React from 'react'
import { render } from 'test-utils'

describe('DealClosures', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<DealClosures />)
  })
})
