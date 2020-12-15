import React from 'react'
import { render, cleanup } from 'test-utils'
import { AppRoot } from 'app/AppRoot'

describe('AppRoot', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<AppRoot />)
  })
})
