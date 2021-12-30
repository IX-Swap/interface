import { IdentityRouter } from 'app/pages/identity/router/IdentityRouter'
import React from 'react'
import { render } from 'test-utils'

describe('IdentityRouter', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<IdentityRouter />)
  })
})
