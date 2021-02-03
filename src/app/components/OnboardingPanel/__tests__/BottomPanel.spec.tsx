import React from 'react'
import { render, cleanup } from 'test-utils'
import { BottomPanel } from 'app/components/OnboardingPanel/BottomPanel'

describe('BottomPanel', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<BottomPanel />)
  })
})
