import React from 'react'
import { render } from 'test-utils'
import { SecurityRoot } from 'app/pages/security/SecurityRoot'

describe('SecurityRoot', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<SecurityRoot />)
  })
})
