import React from 'react'
import { render, cleanup } from 'test-utils'
import { BackDrop } from 'app/components/OnboardingDialog/BackDrop'

describe('BackDrop', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(<BackDrop opened={true} />)
  })
})
