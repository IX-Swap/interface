import { AuthorizerDealClosureRouter } from 'app/pages/authorizer/pages/DealClosures/AuthorizerDealClosuerRouter'
import React from 'react'
import { render } from 'test-utils'

describe('AuthorizerDealClosure', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<AuthorizerDealClosureRouter />)
  })
})
