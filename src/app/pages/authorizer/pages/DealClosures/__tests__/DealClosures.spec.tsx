import { DealClosures } from 'app/pages/authorizer/pages/DealClosures/DealClosures'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('DealClosures', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<DealClosures />)
  })
})
