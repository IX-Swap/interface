import { AuthorizerDealClosureRouter } from 'app/pages/authorizer/pages/DealClosures/AuthorizerDealClosuerRouter'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('AuthorizerDealClosure', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<AuthorizerDealClosureRouter />)
  })
})
