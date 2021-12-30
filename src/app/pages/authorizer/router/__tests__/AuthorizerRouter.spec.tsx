import { AuthorizerRouter } from 'app/pages/authorizer/router/AuthorizerRouter'
import React from 'react'
import { render } from 'test-utils'

describe('AuthorizerRouter', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<AuthorizerRouter />)
  })
})
