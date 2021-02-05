import React from 'react'
import { render, cleanup } from 'test-utils'
import { Overview } from 'app/pages/security/pages/setup2faguide/components/Overview'

describe('Overview', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<Overview />)
  })
})
