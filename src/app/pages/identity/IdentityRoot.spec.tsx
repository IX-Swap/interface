import React from 'react'
import { render } from 'test-utils'
import { IdentityRoot } from 'app/pages/identity/IdentityRoot'

describe('IdentityRoot', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<IdentityRoot />)
  })
})
