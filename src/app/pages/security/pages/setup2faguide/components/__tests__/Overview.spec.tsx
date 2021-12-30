import React from 'react'
import { render } from 'test-utils'
import { Overview } from 'app/pages/security/pages/setup2faguide/components/Overview'

describe('Overview', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<Overview />)
  })
})
