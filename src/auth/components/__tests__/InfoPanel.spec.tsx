import { InfoPanel } from 'auth/components/InfoPanel'
import React from 'react'
import { render, cleanup } from 'test-utils'

describe('InfoPanel', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<InfoPanel />)
  })
})
