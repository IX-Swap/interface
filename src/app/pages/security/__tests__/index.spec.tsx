import React from 'react'
import { render, cleanup } from 'test-utils'
import { SecurityRoot } from 'app/pages/security/SecurityRoot'

describe('SecurityRoot', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<SecurityRoot />)
  })
})
