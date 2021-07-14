import { IdentityRouter } from 'app/pages/identity/router/IdentityRouter'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('IdentityRouter', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<IdentityRouter />)
  })
})
