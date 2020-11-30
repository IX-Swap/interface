import React from 'react'
import { render, cleanup } from 'test-utils'
import { AppLogo } from 'app/components/AppLogo/AppLogo'

describe('AppLogo', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<AppLogo />)
  })
})
