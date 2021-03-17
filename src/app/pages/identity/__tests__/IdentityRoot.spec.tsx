import React from 'react'
import { render, cleanup } from 'test-utils'
import { IdentityRoot } from 'app/pages/_identity/IdentityRoot'

describe('IdentityRoot', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<IdentityRoot />)
  })
})
