import React from 'react'
import { render } from 'test-utils'
import { AuthorizerRoot } from 'app/pages/authorizer/AuthorizerRoot'
import { history } from 'config/history'

describe('AuthorizerRoot', () => {
  beforeEach(() => {
    history.push('/')
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<AuthorizerRoot />)
  })
})
