import React from 'react'
import { render, cleanup } from 'test-utils'
import { AuthRoot } from 'auth/AuthRoot'

describe('AuthRoot', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<AuthRoot />)
  })
})
