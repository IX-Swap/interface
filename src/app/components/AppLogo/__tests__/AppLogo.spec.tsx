import React from 'react'
import { render } from 'test-utils'
import { AppLogo } from 'app/components/AppLogo/AppLogo'

describe('AppLogo', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<AppLogo />)
  })
})
