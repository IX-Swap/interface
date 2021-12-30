import React from 'react'
import { render } from 'test-utils'
import { AuthRoot } from 'auth/AuthRoot'

describe('AuthRoot', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<AuthRoot />)
  })
})
