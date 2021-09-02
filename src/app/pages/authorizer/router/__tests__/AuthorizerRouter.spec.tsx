import { AuthorizerRouter } from 'app/pages/authorizer/router/AuthorizerRouter'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('AuthorizerRouter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<AuthorizerRouter />)
  })
})
