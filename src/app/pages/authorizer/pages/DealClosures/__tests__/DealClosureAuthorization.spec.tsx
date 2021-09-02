import { DealClosureAuthorization } from 'app/pages/authorizer/pages/DealClosures/DealClosureAuthorization'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('DealClosureAuthorization', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<DealClosureAuthorization />)
  })
})
