import React from 'react'
import { render, cleanup } from 'test-utils'
import { AuthorizerRoot } from 'app/pages/authorizer/AuthorizerRoot'
import { history } from 'config/history'

describe('AuthorizerRoot', () => {
  beforeEach(() => {
    history.push('/')
  })

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<AuthorizerRoot />)
  })
})
