import { InfoPanel } from 'auth/components/InfoPanel'
import React from 'react'
import { render } from 'test-utils'

describe('InfoPanel', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<InfoPanel />)
  })
})
