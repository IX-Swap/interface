import React from 'react'
import { render } from 'test-utils'
import { AppRoot } from 'app/AppRoot'

describe('AppRoot', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<AppRoot />)
  })
})
