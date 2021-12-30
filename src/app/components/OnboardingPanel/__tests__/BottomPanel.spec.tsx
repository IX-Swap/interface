import React from 'react'
import { render } from 'test-utils'
import { BottomPanel } from 'app/components/OnboardingPanel/BottomPanel'

describe('BottomPanel', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without errors', () => {
    render(<BottomPanel />)
  })
})
